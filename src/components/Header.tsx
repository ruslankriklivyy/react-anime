import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container } from '../App';
import { Categories, HeaderActions } from '.';
import { getGenres, setCurrentGenre } from '../redux/filters';
import { RootState } from '../redux';
import { Genres } from '../types/types';

import closeSvg from '../assets/img/cancel.svg';

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
  &:hover {
    background-color: #f1b32e;
  }
  &:active {
    transform: translateY(6px);
  }
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

interface IHeaderBottom {
  show: boolean;
}

const Header = () => {
  const dispatch = useDispatch();
  const animeGenres = useSelector((state: RootState) => state.filters.animeGenres);
  const [visibleGenres, setVisibleGenres] = React.useState(false);

  const toggleVisibleGenres = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setVisibleGenres(!visibleGenres);
  };

  const selectGenre = (genre: string) => {
    dispatch(setCurrentGenre(genre));
  };

  React.useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderTop>
          <Title>
            <Link to="/">React Anime</Link>
          </Title>
          <Categories toggleVisibleGenres={toggleVisibleGenres} />
          <HeaderRight>
            <HeaderActions />
          </HeaderRight>
        </HeaderTop>
        <HeaderBottom show={visibleGenres}>
          <HeaderBottomClose onClick={() => toggleVisibleGenres()}>
            <img src={closeSvg} alt="close svg" />
          </HeaderBottomClose>
          {animeGenres?.data.map((item: Genres) => (
            <HeaderGenre
              key={item.id}
              onClick={() => selectGenre(item.attributes.name.toLowerCase())}>
              {item.attributes.name}
            </HeaderGenre>
          ))}
        </HeaderBottom>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
