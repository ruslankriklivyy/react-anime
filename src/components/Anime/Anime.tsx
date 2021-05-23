import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Slider from 'react-slick';

import { RootState } from '../../redux';
import { getAnime, getFavoritesAnime, setAnimeId } from '../../redux/anime';
import { Container } from '../../App';
import { AnimeItem, AnimeItemLoader, Button } from '..';

import arrowSvg from '../../assets/img/arrow.svg';
import { setCurrentPageNumber } from '../../redux/filters';
import scrollTop from '../../utils/scrollTop';

const AnimeWrapper = styled.section`
  position: relative;
  padding-top: 60px;
  margin-bottom: 40px;
  .slick-list {
    overflow: unset;
  }
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
  svg {
    margin-bottom: 30px;
  }
  a {
    margin-bottom: 30px;
  }
`;

const AnimePaginator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Anime = () => {
  const dispatch = useDispatch();
  const { animeItems, animeFavoritesItems, isLoading } = useSelector(
    (state: RootState) => state.anime,
  );
  const { currentGenre, animeSearchValue } = useSelector((state: RootState) => state.filters);

  let { currentPageNumber } = useSelector((state: RootState) => state.filters);

  const onSelectAnime = (id: number) => {
    dispatch(setAnimeId(id));
  };

  const onPlusPageNumber = () => {
    dispatch(setCurrentPageNumber(currentPageNumber + 12));
    scrollTop();
  };

  const onMinusPageNumber = () => {
    if (currentPageNumber !== 0) {
      dispatch(setCurrentPageNumber(currentPageNumber - 12));
    }
    scrollTop();
  };

  const settings = {
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true,
    centerPadding: '70px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  React.useEffect(() => {
    dispatch(getAnime());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getFavoritesAnime({ animeSearchValue, currentGenre, currentPageNumber }));
  }, [dispatch, animeSearchValue, currentGenre, currentPageNumber]);

  return (
    <AnimeWrapper>
      <Container>
        <TitleMain>Top Rating</TitleMain>
        <AnimeBox>
          <Slider {...settings}>
            {isLoading
              ? animeItems?.map((item) => (
                  <AnimeItem
                    key={item.id}
                    item={item.attributes}
                    selectItem={() => onSelectAnime(Number(item.id))}
                  />
                ))
              : Array(12)
                  .fill(0)
                  .map((_, index) => <AnimeItemLoader key={index} />)}
          </Slider>
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
        <AnimePaginator>
          {currentPageNumber > 1 && (
            <Button onClick={() => onMinusPageNumber()} paginator previous>
              <img src={arrowSvg} alt="arrow svg" /> <span>Previous Page</span>
            </Button>
          )}
          <Button onClick={() => onPlusPageNumber()} paginator>
            <span>Next Page</span> <img src={arrowSvg} alt="arrow svg" />
          </Button>
        </AnimePaginator>
      </Container>
    </AnimeWrapper>
  );
};

export default Anime;
