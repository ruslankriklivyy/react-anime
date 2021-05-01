import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../redux';
import { Container } from '../App';
import { getUsers } from '../redux/users';
import { UsersData } from '../types/types';

import userPng from '../assets/img/empty-user.png';
import loverSvg from '../assets/img/lover.svg';
import followersSvg from '../assets/img/followers.svg';

const UsersWrapper = styled.div``;

const UsersBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const UsersItem = styled.div`
  min-height: 160px;
  margin: 10px;
  padding: 15px;
  background-color: #212121;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  h4 {
    font-size: 22px;
    margin: 5px 0;
  }
  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const UsersItemBottom = styled.div`
  img {
    width: 17px;
    height: 17px;
    margin-left: 5px;
  }
`;

const UsersItemInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <UsersWrapper>
      <Container>
        <UsersBox>
          {users?.data.map((item: UsersData) => (
            <UsersItem key={item.id}>
              <img src={item.attributes.avatar?.large || userPng} alt="avatar" />
              <h4>{item.attributes.name}</h4>
              <UsersItemBottom>
                <UsersItemInfo>
                  favorites: {item.attributes.favoritesCount} <img src={loverSvg} alt="lover svg" />
                </UsersItemInfo>
                <UsersItemInfo>
                  followers: {item.attributes.followersCount}{' '}
                  <img src={followersSvg} alt="followers svg" />
                </UsersItemInfo>
              </UsersItemBottom>
            </UsersItem>
          ))}
        </UsersBox>
      </Container>
    </UsersWrapper>
  );
};

export default Users;
