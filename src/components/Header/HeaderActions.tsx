import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useDebouncedCallback } from 'use-debounce';

import { RootState } from '../../redux';
import { setAnimeSearchValue } from '../../redux/filters';
import { setIsAuth } from '../../redux/users';

import searchSvg from '../../assets/img/search.svg';
import notificationSvg from '../../assets/img/bell.svg';
import enterSvg from '../../assets/img/enter.svg';
import { device } from '../../utils/deviceMedia';

interface IHeaderSearchInput {
  show: boolean;
}

interface IHeaderActions {
  toggleVisibleAuth: () => void;
  burgerMenu?: boolean;
}

export const HeaderActions: React.FC<IHeaderActions> = ({ toggleVisibleAuth, burgerMenu }) => {
  const dispatch = useDispatch();
  const animeSearchValue = useSelector((state: RootState) => state.filters.animeSearchValue);
  const isAuth = useSelector((state: RootState) => state.users.isAuth);

  const [visibleInput, setVisibleInput] = React.useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const handleInputValue = useDebouncedCallback((value: string) => {
    dispatch(setAnimeSearchValue(value));
  }, 100);

  const logout = () => {
    removeCookie('userInfo');
    removeCookie('token');
    dispatch(setIsAuth(false));
  };

  return (
    <HeaderActionWrapper burgerMenu={burgerMenu}>
      <HeaderSearchInput
        show={visibleInput}
        placeholder="Search anime"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value)}
        value={animeSearchValue}
      />
      <HeaderAction onClick={() => setVisibleInput(!visibleInput)}>
        <img src={searchSvg} alt="search svg" />
      </HeaderAction>
      <HeaderAction>
        <img src={notificationSvg} alt="notification svg" />
      </HeaderAction>
      {!isAuth ? (
        <HeaderAction onClick={() => toggleVisibleAuth()}>
          <img src={enterSvg} alt="enter svg" />
        </HeaderAction>
      ) : (
        <UserInfo>
          <UserEmail>{cookies?.userInfo?.email}</UserEmail>
          <UserLogout onClick={() => logout()}>Logout</UserLogout>
        </UserInfo>
      )}
    </HeaderActionWrapper>
  );
};

export const HeaderActionWrapper = styled.div`
  @media ${device.laptopL} {
    ${(props: any) => (props.burgerMenu ? 'display: block;' : 'display: none;')};
  }
`;

const HeaderAction = styled.button`
  position: relative;
  z-index: 500;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 12px;
  transition: all 0.2s ease;

  &:active {
    transform: translateY(5px);
    opacity: 0.8;
  }
  img {
    width: 23px;
    height: 23px;
  }
`;

const HeaderSearchInput = styled.input`
  border: 2px solid #fff;
  border-radius: 13px;
  background: transparent;
  font-size: 17px;
  color: #fff;
  letter-spacing: 1px;
  outline: none;
  transition: all 0.3s ease;
  ${(props: IHeaderSearchInput) => (props.show ? 'visibility: visible' : 'visibility: hidden;')};
  ${(props: IHeaderSearchInput) => (props.show ? 'width: 300px' : 'width: 0;')};
  ${(props: IHeaderSearchInput) => (props.show ? 'height: 40px' : 'height: 0;')};
  ${(props: IHeaderSearchInput) => (props.show ? 'padding: 10px' : 'padding: 0;')};
  &::placeholder {
    color: #fff;
    letter-spacing: 1px;
  }
  &:focus {
    border-color: #f1b32e;
  }
  &:focus::placeholder {
    font-size: 0;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserEmail = styled.div`
  letter-spacing: 1px;
`;

const UserLogout = styled.button`
  background: transparent;
  color: #fff;
  cursor: pointer;
  border: 2px solid #f1b32e;
  padding: 4px 10px;
  letter-spacing: 1px;
  border-radius: 6px;
  margin-left: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f1b32e;
  }
  &:active {
    transform: translateY(3px);
  }
`;
