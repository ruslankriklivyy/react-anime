import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  getEpisodesAnime,
  getGenresAnime,
  getOneAnime,
  getReviewsAnime,
  setAnimeId,
} from '../redux/anime';
import { Container } from '../App';
import { RootState } from '../redux';

import starSvg from '../assets/img/star.svg';
import { AnimeReviewsAttributes, AnimeReviewsData, AttributesGenres, Genres } from '../types/types';
import { AnimeEpisodes, AnimeReviewsItem, AnimeTrailer, Button } from '../components';

import scrollTop from '../utils/scrollTop';

const AnimeInfoWrapper = styled.div`
  position: relative;
  .slick-arrow {
    display: block;
    position: absolute;
    top: -90px;
    z-index: 500;
    &:before {
      font-size: 35px;
      transition: all 0.3s ease;
    }
  }
  .slick-next {
    right: 0;
  }
  .slick-prev {
    right: 50px !important;
    left: auto;
  }
  .slick-slide {
    display: inline-flex;
    justify-content: flex-start;
  }
  .slick-slide > div {
    width: 310px !important;
    height: 240px !important;
    margin: 0 auto;
  }
`;

const AnimeInfoBox = styled.div``;

const AnimeImage = styled.img`
  display: block;
  width: 310px;
  height: 390px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 35px;
`;

const AnimeInfoMain = styled.div`
  position: relative;
`;

const AnimeInfoName = styled.h4`
  font-weight: 500;
  font-size: 34px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const AnimeInfoDate = styled.span`
  display: block;
  margin-bottom: 4px;
  margin-left: 10px;
  font-weight: 500;
  font-size: 22px;
  color: #4a4a4a;
  letter-spacing: 1px;
`;

const AnimeInfoTop = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const AnimeInfoDescr = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 1.3;
  width: 80%;
  margin-bottom: 45px;
`;

const AnimeRating = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  img {
    display: block;
    width: 22px;
    height: 22px;
    margin-right: 12px;
  }
  span {
    padding-top: 3px;
    font-size: 18px;
  }
`;

const AnimeInfoGenre = styled.button`
  border: none;
  background-color: #ffb400;
  padding: 7px 20px;
  border-radius: 12px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  margin-right: 7px;
  margin-bottom: 7px;
  letter-spacing: 1px;
`;

const AnimeInfoGenres = styled.div`
  margin-bottom: 35px;
`;

export const Box = styled.div`
  position: relative;
  display: ${(props: AnimeBox) => (props.slider ? 'block' : 'flex')};
  background-color: #212121;
  width: 100%;
  ${(props: AnimeBox) => (props.reviews ? 'min-height: 0;' : 'min-height: 250px;')}
  ${(props: AnimeBox) => (props.reviews ? 'padding: 25px;' : 'padding: 55px;')}
  border-radius: 40px;
  z-index: 10;
  ${(props: AnimeBox) => (props.slider || props.reviews ? 'border-top-left-radius: 0;' : '')};
`;

interface AnimeBox {
  slider: boolean;
  reviews: boolean;
}

const AnimeInfo = () => {
  const dispatch = useDispatch();
  const animeId = useSelector((state: RootState) => state.anime.animeId);
  const animeItem = useSelector((state: RootState) => state.anime.chosenAnime);
  const genresAnime = useSelector((state: RootState) => state.anime.genresAnime);
  const { posterImage, titles, startDate, synopsis, averageRating, youtubeVideoId } =
    animeItem.hasOwnProperty('data') && animeItem.data.attributes;

  const [visibleTrailer, setVisibleTrailer] = React.useState(false);

  const closeTrailer = React.useCallback(() => {
    setVisibleTrailer(false);
  }, []);

  const openTrailer = () => {
    setVisibleTrailer(true);
    scrollTop();
  };

  React.useEffect(() => {
    scrollTop();
  }, []);

  React.useEffect(() => {
    dispatch(getOneAnime({ animeId }));
  }, [dispatch, animeId]);

  React.useEffect(() => {
    dispatch(getGenresAnime({ animeId }));
  }, [dispatch, animeId]);

  React.useEffect(() => {
    const animeIdStorage = JSON.parse(localStorage.getItem('animeId') || 'number');
    if (!animeId) {
      dispatch(setAnimeId(Number(animeIdStorage)));
    }
  }, [dispatch, animeId]);

  React.useEffect(() => {
    localStorage.setItem('animeId', JSON.stringify(animeId));
  }, [animeId]);

  return (
    <AnimeInfoWrapper>
      <Container>
        <AnimeTrailer
          youtubeVideoId={youtubeVideoId}
          visibleTrailer={visibleTrailer}
          closeTrailer={closeTrailer}
        />
        <AnimeInfoBox>
          <Box>
            {animeItem.hasOwnProperty('data') && (
              <>
                <div>
                  <AnimeImage src={posterImage.medium} />
                </div>
                <AnimeInfoMain>
                  <AnimeRating>
                    <img src={starSvg} alt="star svg" />
                    <span>{averageRating}</span>
                  </AnimeRating>
                  <AnimeInfoTop>
                    <AnimeInfoName>{titles.en || titles.en_jp}</AnimeInfoName>
                    <AnimeInfoDate>{startDate.slice(0, 4)}</AnimeInfoDate>
                  </AnimeInfoTop>
                  <AnimeInfoDescr>{synopsis}</AnimeInfoDescr>
                  <AnimeInfoGenres>
                    {genresAnime?.map((genre: Genres) => (
                      <AnimeInfoGenre key={genre.id}>{genre.attributes.name}</AnimeInfoGenre>
                    ))}
                  </AnimeInfoGenres>
                  <Button onClick={() => openTrailer()}>Watch Trailer</Button>
                </AnimeInfoMain>
              </>
            )}
          </Box>
        </AnimeInfoBox>
        <AnimeEpisodes />
        <AnimeReviewsItem />
      </Container>
    </AnimeInfoWrapper>
  );
};

export default AnimeInfo;
