import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { Box } from '../../pages/AnimePage';
import { getEpisodesAnime } from '../../redux/anime';

import episodesEmptyJpg from '../../assets/img/episodes-empty.jpg';

const AnimeEpisodeNumber = styled.div`
  position: absolute;
  bottom: 15px;
  z-index: 300;
  font-size: 19px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const AnimeEpisodeTime = styled.span`
  position: absolute;
  bottom: 10px;
  left: 13px;
  z-index: 200;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1px;
`;

const AnimeEpisodeBlockOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 50;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    text-align: center;
    font-size: 24px;
    letter-spacing: 1px;
  }
`;

const AnimeEpisode = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  border-radius: 35px;
  z-index: 10;
  overflow: hidden;
  cursor: pointer;
  &:hover ${AnimeEpisodeBlockOut} {
    opacity: 1;
  }
  img {
    border-radius: 35px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AnimeEpisodesWrapper = styled.div`
  margin-top: 85px;
`;

const AnimeEpisodesSlider = styled.div``;

const AnimeSeasonNumber = styled.span`
  padding: 21px 40px;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  background-color: #212121;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const AnimeEpisodes = () => {
  const dispatch = useDispatch();
  const { episodesAnime, animeId } = useSelector((state: RootState) => state.anime);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
    dispatch(getEpisodesAnime({ animeId }));
  }, [dispatch, animeId]);

  return (
    <>
      {episodesAnime?.data && (
        <AnimeEpisodesWrapper>
          <AnimeSeasonNumber>
            Season {episodesAnime?.data[0].attributes.seasonNumber}
          </AnimeSeasonNumber>
          <Box slider>
            <AnimeEpisodesSlider>
              <Slider {...settings}>
                {episodesAnime.data?.map(({ attributes }) => (
                  <>
                    <AnimeEpisode>
                      <AnimeEpisodeBlockOut>
                        <h2>{attributes.canonicalTitle || 'No information'}</h2>
                      </AnimeEpisodeBlockOut>
                      <AnimeEpisodeTime>{attributes.length} minutes</AnimeEpisodeTime>
                      <img
                        src={attributes.thumbnail?.original || episodesEmptyJpg}
                        alt="episode img"
                      />
                    </AnimeEpisode>
                    <AnimeEpisodeNumber>Episode {attributes.number}</AnimeEpisodeNumber>
                  </>
                ))}
              </Slider>
            </AnimeEpisodesSlider>
          </Box>
        </AnimeEpisodesWrapper>
      )}
    </>
  );
};

export default AnimeEpisodes;
