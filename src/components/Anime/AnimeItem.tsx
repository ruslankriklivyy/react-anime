import React from 'react';
import styled from 'styled-components';

import { AttributesAnime } from '../../interfaces/interfaces';
import starSvg from '../../assets/img/star.svg';
import { device } from '../../utils/deviceMedia';

interface AnimeItemProps {
  item: AttributesAnime;
  selectItem: () => void;
}

const AnimeItem: React.FC<AnimeItemProps> = ({ item, selectItem }) => {
  return (
    <>
      <AnimeItemWrapper onClick={selectItem}>
        <AnimeBlockout>
          <h2>{item.titles.en || item.titles.en_jp}</h2>
        </AnimeBlockout>
        <AnimeRating>
          <img src={starSvg} alt="star svg" />
          <span>{item.averageRating}</span>
        </AnimeRating>
        <AnimeImage src={item.posterImage?.medium} />
      </AnimeItemWrapper>
    </>
  );
};

export default AnimeItem;

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

export const AnimeItemWrapper = styled.div`
  position: relative;
  z-index: 50;
  color: #fff;
  width: 330px !important;
  height: 360px !important;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 20px;
  margin-bottom: 20px;
  @media ${device.laptopB} {
    width: 270px !important;
    height: 330px !important;
    margin-right: 40px;
    margin-bottom: 20px;
  }
  @media ${device.laptop} {
    margin-right: 20px;
    margin-bottom: 0;
  }
  @media ${device.mobile} {
    width: 90% !important;
    height: 400px !important;
    margin: 0 auto;
  }
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
