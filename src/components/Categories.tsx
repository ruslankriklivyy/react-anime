import React from 'react';
import { Link } from 'react-router-dom';
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
      font-size: 19px;
      color: #fff;
      margin: 0 15px;
      padding-bottom: 4px;
      transition: all 0.2s ease;
      &.active {
        ::after {
          width: 70%;
          visibility: visible;
          opacity: 1;
        }
      }
      &.open-genres {
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

const categoriesArr = ['Home', 'Anime List', 'Users'];

interface ICategories {
  toggleVisibleGenres: (e: React.MouseEvent) => void;
}

const Categories: React.FC<ICategories> = ({ toggleVisibleGenres }) => {
  return (
    <CategoriesWrapper>
      {categoriesArr.map((name, index) => (
        <li key={index}>
          <Link to={`/${name.toLowerCase().split(' ').join('')}`}>{name}</Link>
        </li>
      ))}
      <li>
        <a href="/" className="open-genres" onClick={(e) => toggleVisibleGenres(e)}>
          Genres
        </a>
      </li>
    </CategoriesWrapper>
  );
};

export default Categories;
