import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import starSvg from '../../assets/img/star.svg';
import { RootState } from '../../redux';
import { Box } from '../../pages/AnimePage';
import { AnimeInfoActions, AnimeInfoLoader } from '..';
import { Genres } from '../../interfaces/interfaces';
import { getGenresAnime, getOneAnime, setAnimeId } from '../../redux/anime';
import { device } from '../../utils/deviceMedia';

interface IAnimePageInfo {
  openAddBlock: () => void;
  setVisibleTrailer: (visible: boolean) => void;
}

const AnimePageInfo: React.FC<IAnimePageInfo> = ({ openAddBlock, setVisibleTrailer }) => {
  const dispatch = useDispatch();
  const { chosenAnime, animeId, genresAnime, isLoadingInfo } = useSelector(
    (state: RootState) => state.anime,
  );
  const { posterImage, titles, startDate, synopsis, averageRating } =
    chosenAnime.hasOwnProperty('data') && chosenAnime.data.attributes;

  const [cookies, setCookie] = useCookies(['animeId']);

  React.useEffect(() => {
    if (animeId !== null) {
      setCookie('animeId', animeId, { path: '/' });
    }
  }, [dispatch, animeId, setCookie]);

  React.useEffect(() => {
    if (animeId === null) {
      dispatch(setAnimeId(cookies.animeId));
    }
  }, [animeId, dispatch, cookies.animeId]);

  React.useEffect(() => {
    dispatch(getGenresAnime({ animeId }));
  }, [dispatch, animeId]);

  React.useEffect(() => {
    dispatch(getOneAnime({ animeId }));
  }, [dispatch, animeId]);

  return (
    <Box>
      {isLoadingInfo ? (
        <AnimePageInfoWrapper>
          <div>
            <AnimeImage src={posterImage.medium} />
          </div>
          <AnimeRating>
            <img src={starSvg} alt="star svg" />
            <span>{averageRating}</span>
          </AnimeRating>
          <AnimeInfoMain>
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
            <AnimeInfoActions openAddBlock={openAddBlock} setVisibleTrailer={setVisibleTrailer} />
          </AnimeInfoMain>
        </AnimePageInfoWrapper>
      ) : (
        <AnimeInfoLoader />
      )}
    </Box>
  );
};

export default React.memo(AnimePageInfo);

const AnimePageInfoWrapper = styled.div`
  display: flex;
  @media ${device.laptopB} {
    flex-direction: column;
  }
`;

const AnimeImage = styled.img`
  display: block;
  width: 310px;
  height: 390px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 35px;
  @media ${device.laptopB} {
    margin-bottom: 40px;
    width: 100%;
    height: 430px;
  }
`;

const AnimeInfoMain = styled.div`
  position: relative;
`;

const AnimeInfoName = styled.h4`
  font-weight: 500;
  font-size: 34px;
  letter-spacing: 2px;
  text-transform: uppercase;
  @media ${device.laptop} {
    font-size: 24px;
  }
  @media ${device.mobile} {
    font-size: 19px;
  }
`;

const AnimeInfoDate = styled.span`
  display: block;
  margin-bottom: 4px;
  margin-left: 10px;
  font-weight: 500;
  font-size: 22px;
  color: #4a4a4a;
  letter-spacing: 1px;
  @media ${device.laptop} {
    font-size: 18px;
  }
  @media ${device.mobile} {
    font-size: 16px;
  }
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
  @media ${device.laptopB} {
    width: 100%;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`;

const AnimeRating = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 55px;
  right: 55px;
  z-index: 300;
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
  @media ${device.laptopB} {
    position: static;
    margin-bottom: 10px;
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
  @media ${device.laptop} {
    font-size: 14px;
    padding: 5px 13px;
  }
`;

const AnimeInfoGenres = styled.div`
  margin-bottom: 35px;
`;
