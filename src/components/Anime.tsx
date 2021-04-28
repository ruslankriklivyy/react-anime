import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Slider from 'react-slick';

import { RootState } from '../redux';
import { getAnime, setAnimeId } from '../redux/anime';
import { Container } from '../App';

import starSvg from '../assets/img/star.svg';
import { Link } from 'react-router-dom';

const AnimeWrapper = styled.section`
  position: relative;
  padding-top: 60px;
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
  .slick-slide {
    display: inline-flex;
    justify-content: flex-start;
  }
  .slick-slide > div {
    width: 300px !important;
    height: 360px !important;
  }
`;

const AnimeBox = styled.div``;

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

const AnimeItem = styled.div`
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
    margin-right: 7px;
  }
  span {
    font-size: 15px;
  }
`;

const TitleMain = styled.h2`
  display: block;
  position: relative;
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 30px;
  padding-bottom: 7px;
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

const Anime = () => {
  const dispatch = useDispatch();
  const anime = useSelector((state: RootState) => state.anime.animeItems);

  const onSelectAnime = (id: number) => {
    dispatch(setAnimeId(id));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
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

  return (
    <AnimeWrapper>
      <Container>
        <TitleMain>Recently Added</TitleMain>
        <AnimeBox>
          <Slider {...settings}>
            {anime.data?.map((item: any) => (
              <Link to="info">
                <AnimeItem key={item.id} onClick={() => onSelectAnime(item.id)}>
                  <AnimeBlockout>
                    <h2>{item.attributes.titles.en || item.attributes.titles.en_jp}</h2>
                  </AnimeBlockout>
                  <AnimeRating>
                    <img src={starSvg} alt="star svg" />
                    <span>{item.attributes.averageRating}</span>
                  </AnimeRating>
                  <AnimeImage src={item.attributes.posterImage.medium} />
                </AnimeItem>
              </Link>
            ))}
          </Slider>
        </AnimeBox>
      </Container>
    </AnimeWrapper>
  );
};

export default Anime;
