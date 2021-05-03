import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import starSvg from '../assets/img/star.svg';
import { Anime } from '../types/types';

const AnimeImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
`;

const AnimeBlockout = styled.div`
  border-radius: 20px;
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 50;
  h2 {
    font-size: 27px;
    letter-spacing: 1px;
  }
`;

const AnimeItemWrapper = styled.div`
  position: relative;
  color: #fff;
  width: 300px !important;
  height: 360px !important;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:active {
    transform: translateY(7px);
  }
  &:hover ${AnimeBlockout} {
    opacity: 1;
  }
`;

const AnimeRating = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  width: 90px;
  height: 28px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  padding: 0 10px;
  img {
    display: block;
    width: 15px;
    height: 15px;
    margin-bottom: 3px;
    margin-right: 7px;
  }
  span {
    font-size: 15px;
  }
`;

interface AnimeItemProps {
  item: Anime;
  selectItem: (id: number) => void;
}

const AnimeItem: React.FC<AnimeItemProps> = ({ item, selectItem }) => {
  return (
    <Link to="info">
      <AnimeItemWrapper key={item.id} onClick={() => selectItem(Number(item.id))}>
        <AnimeBlockout>
          <h2>{item.attributes.titles.en || item.attributes.titles.en_jp}</h2>
        </AnimeBlockout>
        <AnimeRating>
          <img src={starSvg} alt="star svg" />
          <span>{item.attributes.averageRating}</span>
        </AnimeRating>
        <AnimeImage src={item.attributes.posterImage?.medium} />
      </AnimeItemWrapper>
    </Link>
  );
};

export default AnimeItem;
