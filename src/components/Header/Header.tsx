import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Container } from '../../App';
import { getGenres } from '../../redux/filters';
import { RootState } from '../../redux';
import { setIsAuth } from '../../redux/users';

import closeSvg from '../../assets/img/cancel.svg';
import menuSvg from '../../assets/img/menu.svg';
import { device } from '../../utils/deviceMedia';
import { Categories } from '../Categories';
import { BurgerMenu } from '../BurgerMenu';
import { HeaderActions } from './HeaderActions';
import { HeaderGenres } from './HeaderGenres';
import { Auth } from '../Auth/Auth';

interface IHeaderBottom {
  show: boolean;
}

export const Header = () => {
  const dispatch = useDispatch();
  const { token, userInfo } = useSelector((state: RootState) => state.users);

  const [visibleGenres, setVisibleGenres] = React.useState(false);
  const [visibleAuth, setVisibleAuth] = React.useState(false);
  const [visibleBurgerMenu, setVisibleBurgerMenu] = React.useState(false);
  const blockOutRef = React.useRef<HTMLDivElement>(null);

  const [cookies, setCookie] = useCookies(['token']);

  const toggleVisibleGenres = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setVisibleGenres(!visibleGenres);
  };

  const toggleVisibleAuth = () => {
    setVisibleAuth(!visibleAuth);
  };

  const onCloseAuth = () => {
    setVisibleAuth(false);
  };

  const onCloseBurgerMenu = () => {
    setVisibleBurgerMenu(false);
  };

  React.useEffect(() => {
    if (token !== null) {
      setCookie('token', token, { path: '/' });
    }
  }, [token, setCookie]);

  React.useEffect(() => {
    if (userInfo.email !== '') {
      setCookie('userInfo', userInfo, { path: '/' });
    }
  }, [userInfo, setCookie]);

  React.useEffect(() => {
    if (cookies.token) {
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
    }
  }, [dispatch, cookies]);

  React.useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <BlockOut ref={blockOutRef} show={visibleAuth}></BlockOut>
      <Container>
        <HeaderTop>
          <Title>
            <Link to="/">React Anime</Link>
          </Title>
          <Categories toggleVisibleGenres={toggleVisibleGenres} />
          {visibleBurgerMenu && (
            <BurgerMenu
              toggleVisibleGenres={toggleVisibleGenres}
              toggleVisibleAuth={toggleVisibleAuth}
              onCloseBurgerMenu={onCloseBurgerMenu}
            />
          )}
          <HeaderRight>
            {!visibleBurgerMenu && (
              <BurgerMenuButton onClick={() => setVisibleBurgerMenu(true)}>
                <img src={menuSvg} alt="menuSvg" />
              </BurgerMenuButton>
            )}
            <HeaderActions toggleVisibleAuth={toggleVisibleAuth} />
          </HeaderRight>
        </HeaderTop>
        <HeaderBottom show={visibleGenres}>
          <HeaderBottomClose onClick={() => toggleVisibleGenres()}>
            <img src={closeSvg} alt="close svg" />
          </HeaderBottomClose>
          <HeaderGenres />
        </HeaderBottom>
        <Auth
          blockOutRef={blockOutRef}
          visibleAuth={visibleAuth}
          toggleVisibleAuth={toggleVisibleAuth}
          onCloseAuth={onCloseAuth}
        />
      </Container>
    </HeaderWrapper>
  );
};

const BurgerMenuButton = styled.button`
  display: none;
  cursor: pointer;
  background: transparent;
  border: none;
  height: 40px;
  @media ${device.laptopL} {
    display: block;
  }
  img {
    width: 50px;
    height: 30px;
  }
`;

const HeaderWrapper = styled.header`
  padding-top: 25px;
  min-height: 90px;
  width: 100%;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 35px;
  letter-spacing: 1px;
  color: #f1b32e;
  a {
    color: #f1b32e;
    text-decoration: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderBottom = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  background-color: #212121;
  ${(props: IHeaderBottom) => (props.show ? 'min-height: 100px' : 'height: 0;')}
  ${(props: IHeaderBottom) => (props.show ? 'padding: 20px' : 'padding: 0;')}
  ${(props: IHeaderBottom) => (props.show ? 'margin-top: 20px' : 'margin-top: 0;')}
  overflow: hidden;
  border-radius: 20px;
  transition: all 0.3s ease;
`;

const HeaderBottomClose = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 500;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: translateY(5px);
  }
  img {
    width: 15px;
    height: 15px;
  }
`;

const BlockOut = styled.div`
  position: fixed;
  ${(props: IHeaderBottom) => (props.show ? 'visibility: visible' : 'visibility: hidden')};
  top: 0;
  transition: all 0.2s ease;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 800;
`;
