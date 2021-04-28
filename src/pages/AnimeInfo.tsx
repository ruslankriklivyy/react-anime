import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getGenresAnime, getOneAnime, setAnimeId } from '../redux/anime';
import { Container } from '../App';
import { RootState } from '../redux';

import starSvg from '../assets/img/star.svg';

const AnimeInfoWrapper = styled.div``;

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

export const Box = styled.div`
  display: inline-flex;
  background-color: #212121;
  padding: 55px 40px;
  border-radius: 30px;
`;

const AnimeInfo = () => {
  const dispatch = useDispatch();
  const animeId = useSelector((state: RootState) => state.anime.animeId);
  const animeItem = useSelector((state: RootState) => state.anime.chosenAnime);
  const genresAnime = useSelector((state: RootState) => state.anime.genresAnime);
  const { posterImage, titles, startDate, description, averageRating } =
    animeItem.hasOwnProperty('data') && animeItem.data.attributes;

  console.log(genresAnime);

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
        {animeItem.hasOwnProperty('data') && (
          <AnimeInfoBox>
            <Box>
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
                <AnimeInfoDescr>{description}</AnimeInfoDescr>
                {genresAnime?.map((genre: any) => (
                  <AnimeInfoGenre key={genre.id}>{genre.attributes.name}</AnimeInfoGenre>
                ))}
              </AnimeInfoMain>
            </Box>
          </AnimeInfoBox>
        )}
      </Container>
    </AnimeInfoWrapper>
  );
};

export default AnimeInfo;
