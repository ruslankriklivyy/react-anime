import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';

import { AnimeReviewsData } from '../../interfaces/interfaces';
import { Box } from '../../pages/AnimePage';
import { getReviewsAnime } from '../../redux/anime';

import loverSvg from '../../assets/img/lover.svg';

export const AnimeReviewsItem = () => {
  const dispatch = useDispatch();
  const { animeReviews, animeId } = useSelector((state: RootState) => state.anime);

  React.useEffect(() => {
    dispatch(getReviewsAnime({ animeId }));
  }, [dispatch, animeId]);

  return (
    <AnimeInfoReviews>
      {animeReviews?.data.map((item: AnimeReviewsData) => (
        <AnimeInfoReviewsItem key={item.id}>
          <AnimeInfoReviewsTop>
            {item.attributes.likesCount} <img src={loverSvg} alt="lover svg" />
          </AnimeInfoReviewsTop>
          <Box reviews>
            <AnimeInfoReviews>{item.attributes.content}</AnimeInfoReviews>
          </Box>
        </AnimeInfoReviewsItem>
      ))}
    </AnimeInfoReviews>
  );
};

const AnimeInfoReviews = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AnimeInfoReviewsItem = styled.div`
  margin-top: 30px;
`;

const AnimeInfoReviewsTop = styled.div`
  display: inline-flex;
  padding: 5px 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  align-items: center;
  background-color: #212121;
  img {
    width: 23px;
    height: 23px;
    margin-left: 7px;
  }
`;
