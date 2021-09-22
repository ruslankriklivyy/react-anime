import React from 'react';
import styled from 'styled-components';

import closeSvg from '../assets/img/cancel.svg';
import { device } from '../utils/deviceMedia';
import { Categories, CategoriesWrapper } from './Categories';
import { HeaderActions, HeaderActionWrapper } from './Header/HeaderActions';

interface IBurgerMenu {
  toggleVisibleGenres: (e: React.MouseEvent) => void;
  toggleVisibleAuth: () => void;
  onCloseBurgerMenu: () => void;
}

export const BurgerMenu: React.FC<IBurgerMenu> = ({
  toggleVisibleGenres,
  toggleVisibleAuth,
  onCloseBurgerMenu,
}) => {
  return (
    <BurgerMenuWrapper>
      <BurgerMenuClose onClick={() => onCloseBurgerMenu()}>
        <img src={closeSvg} alt="closeSvg" />
      </BurgerMenuClose>
      <BurgerMenuBox>
        <Categories
          burgerMenu
          onCloseBurgerMenu={onCloseBurgerMenu}
          toggleVisibleGenres={toggleVisibleGenres}
        />
        <HeaderActions burgerMenu toggleVisibleAuth={toggleVisibleAuth} />
      </BurgerMenuBox>
    </BurgerMenuWrapper>
  );
};

const BurgerMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 700;
  width: 45%;
  height: 100%;
  background: rgba(24, 24, 24, 0.9);
  ${CategoriesWrapper} {
    text-align: center;
    a {
      position: relative;
      margin-bottom: 40px;
      font-size: 25px;
      &::after {
        position: absolute;
        right: 0;
        bottom: -10px;
        width: 90px;
        margin: 0 auto;
      }
      &.active {
        ::after {
          width: 130px;
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  ${HeaderActionWrapper} {
    text-align: center;
    input {
      display: block;
      margin-bottom: 20px;
    }
  }
  @media ${device.mobile} {
    width: 100%;
  }
`;

const BurgerMenuBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const BurgerMenuClose = styled.button`
  margin-top: 20px;
  margin-right: 20px;
  display: block;
  margin-left: auto;
  background: transparent;
  width: 70px;
  height: 30px;
  cursor: pointer;
  border: none;
  img {
    display: block;
    width: 70px;
    height: 30px;
  }
`;
