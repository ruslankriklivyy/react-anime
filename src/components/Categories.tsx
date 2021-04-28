import React from 'react';
import styled from 'styled-components';

const CategoriesWrapper = styled.ul`
  display: flex;
  align-items: center;
  li {
    a {
      display: block;
      position: relative;
      font-weight: 400;
      letter-spacing: 1px;
      font-size: 21px;
      color: #fff;
      margin: 0 20px;
      padding-bottom: 4px;
      transition: all 0.2s ease;
      &.active {
        ::after {
          width: 70%;
          visibility: visible;
          opacity: 1;
        }
      }
      &:active {
        transform: translateY(5px);
      }
      &:hover::after {
        width: 70%;
        visibility: visible;
        opacity: 1;
      }
      &::after {
        content: '';
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        border-radius: 10px;
        background-color: #f1b32e;
        transition: all 0.4s ease;
      }
    }
  }
`;

const categoriesArr = ['Home', 'Popular', 'Genres', 'Help'];

const Categories = () => {
  return (
    <CategoriesWrapper>
      {categoriesArr.map((name, index) => (
        <li key={index}>
          <a href="/">{name}</a>
        </li>
      ))}
    </CategoriesWrapper>
  );
};

export default Categories;
