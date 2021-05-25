import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentGenre } from '../../redux/filters';
import { Genres } from '../../interfaces/interfaces';
import { RootState } from '../../redux';

interface IHeaderGenres {
  active: boolean;
}

const HeaderGenres = () => {
  const dispatch = useDispatch();
  const { currentGenre, animeGenres } = useSelector((state: RootState) => state.filters);

  const selectGenre = (genre: string) => {
    dispatch(setCurrentGenre(genre));
  };

  return (
    <>
      {animeGenres?.data.map((item: Genres) => (
        <HeaderGenre
          active={item.attributes.name.toLowerCase() === currentGenre}
          key={item.id}
          onClick={() => selectGenre(item.attributes.name.toLowerCase())}>
          {item.attributes.name}
        </HeaderGenre>
      ))}
    </>
  );
};

export default React.memo(HeaderGenres);

const HeaderGenre = styled.button`
  padding: 0 10px;
  height: 40px;
  margin: 10px;
  background: transparent;
  color: #fff;
  border: 2px solid #f1b32e;
  outline: none;
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  ${(props: IHeaderGenres) =>
    props.active ? 'background-color: #f1b32e' : 'background-color:transparent'};
  &:hover {
    background-color: #f1b32e;
  }
  &:active {
    transform: translateY(6px);
  }
`;
