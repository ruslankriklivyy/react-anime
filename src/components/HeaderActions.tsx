import React from 'react';
import styled from 'styled-components';

import searchSvg from '../assets/img/search.svg';
import notificationSvg from '../assets/img/bell.svg';
import enterSvg from '../assets/img/enter.svg';

const HeaderAction = styled.button`
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

const HeaderActions = () => {
  return (
    <>
      <HeaderAction>
        <img src={searchSvg} alt="search svg" />
      </HeaderAction>
      <HeaderAction>
        <img src={notificationSvg} alt="notification svg" />
      </HeaderAction>
      <HeaderAction>
        <img src={enterSvg} alt="enter svg" />
      </HeaderAction>
    </>
  );
};

export default HeaderActions;
