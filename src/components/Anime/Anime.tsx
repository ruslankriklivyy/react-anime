import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../redux';
import { getFavoritesAnime, setAnimeId } from '../../redux/anime';
import { Container } from '../../App';
import { AnimeItem, AnimeItemLoader, AnimeSlider } from '..';
import { AnimePaginator } from '../../components';
import { device } from '../../utils/deviceMedia';
import { AnimeItemWrapper } from './AnimeItem';
import { ButtonWrapper } from '../Button';

const Anime = () => {
  const dispatch = useDispatch();
  const { animeFavoritesItems, isLoading } = useSelector((state: RootState) => state.anime);
  const { currentGenre, animeSearchValue } = useSelector((state: RootState) => state.filters);
  let { currentPageNumber } = useSelector((state: RootState) => state.filters);

  const onSelectAnime = (id: number) => {
    dispatch(setAnimeId(id));
  };

  React.useEffect(() => {
    dispatch(getFavoritesAnime({ animeSearchValue, currentGenre, currentPageNumber }));
  }, [dispatch, animeSearchValue, currentGenre, currentPageNumber]);

  return (
    <AnimeWrapper>
      <Container>
        <TitleMain>Top Rating</TitleMain>
        <AnimeBox>
          <AnimeSlider onSelectAnime={onSelectAnime} />
        </AnimeBox>
        <TitleMain>{currentGenre ?? 'All Anime'}</TitleMain>
        <AnimeAllBox>
          {isLoading
            ? animeFavoritesItems?.map((item) => (
                <AnimeItem
                  key={item.id}
                  item={item.attributes}
                  selectItem={() => onSelectAnime(Number(item.id))}
                />
              ))
            : Array(12)
                .fill(0)
                .map((_, index) => <AnimeItemLoader key={index} />)}
        </AnimeAllBox>
        <AnimePaginator />
      </Container>
    </AnimeWrapper>
  );
};

export default Anime;

const AnimeWrapper = styled.section`
  position: relative;
  padding-top: 60px;
  padding-bottom: 20px;

  .slick-arrow {
    display: block;
    position: absolute;
    top: -60px;
    z-index: 500;
    &:before {
      font-size: 42px;
      transition: all 0.3s ease;
    }
  }
  .slick-next {
    right: 28px;
  }
  .slick-prev {
    right: 100px !important;
    left: auto;
  }
  .slick-slide > div {
    width: 300px !important;
    height: 360px !important;
  }
  @media ${device.mobile} {
    .slick-slide > div {
      width: 100% !important;
      height: 400px !important;
    }
    ${ButtonWrapper} {
      padding: 5px 12px;
      margin: 0 20px;
      span {
        font-size: 0;
        padding: 0;
      }
      img {
        width: 30px;
        height: 30px;
        margin: 0 auto;
      }
    }
  }
`;

const AnimeBox = styled.div`
  margin-bottom: 45px;
`;

const TitleMain = styled.h2`
  display: block;
  position: relative;
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 30px;
  padding-bottom: 7px;
  text-transform: capitalize;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 65px;
    height: 3px;
    border-radius: 10px;
    background-color: #f1b32e;
  }
`;

const AnimeAllBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media ${device.laptopB} {
    justify-content: flex-start;
  }
  @media ${device.mobile} {
    justify-content: center;
  }
  svg {
    margin-bottom: 30px;
  }
  a {
    margin-bottom: 20px;
  }
`;
