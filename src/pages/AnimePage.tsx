import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Container } from '../App';
import { RootState } from '../redux';
import scrollTop from '../utils/scrollTop';
import { device } from '../utils/deviceMedia';
import { AnimeTrailer } from '../components/Anime/AnimeTrailer';
import { AnimeAddBox } from '../components/Anime/AnimeAddBox';
import { AnimePageInfo } from '../components/Anime/AnimePageInfo';
import { AnimeEpisodes } from '../components/Anime/AnimeEpisodes';
import { AnimeReviewsItem } from '../components/Anime/AnimeReviewsItem';

interface IBlockOutInfo {
  show: boolean;
}

interface AnimeBox {
  slider: boolean;
  reviews: boolean;
}

const AnimePage = () => {
  const { chosenAnime } = useSelector((state: RootState) => state.anime);
  const { youtubeVideoId } = chosenAnime.hasOwnProperty('data') && chosenAnime.data.attributes;

  const [visibleTrailer, setVisibleTrailer] = React.useState(false);
  const [visibleAddBlock, setVisibleAddBlock] = React.useState(false);
  const blockOutRef = React.useRef<HTMLDivElement>(null);

  const openAddBlock = () => {
    scrollTop();
    setVisibleAddBlock(true);
  };

  const closeAddBlock = React.useCallback(() => {
    setVisibleAddBlock(false);
  }, []);

  const closeTrailer = React.useCallback(() => {
    setVisibleTrailer(false);
  }, []);

  React.useEffect(() => {
    scrollTop();
  }, []);

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeAddBlock();
      }
    },
    [closeAddBlock],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (
        e.target.className &&
        blockOutRef.current &&
        e.target.className === blockOutRef.current.className
      ) {
        closeAddBlock();
      }
    },
    [blockOutRef, closeAddBlock],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  React.useEffect(() => {
    visibleAddBlock
      ? document.querySelector<HTMLElement>('body')?.setAttribute('style', 'overflow: hidden')
      : document.querySelector<HTMLElement>('body')?.setAttribute('style', 'overflow: auto');
  }, [visibleAddBlock]);

  return (
    <AnimeInfoWrapper>
      <BlockOutInfo ref={blockOutRef} show={visibleAddBlock}></BlockOutInfo>
      <Container>
        <AnimeTrailer
          youtubeVideoId={youtubeVideoId}
          visibleTrailer={visibleTrailer}
          closeTrailer={closeTrailer}
        />
        <AnimeInfoBox>
          <AnimeAddBox closeAddBlock={closeAddBlock} visibleAddBlock={visibleAddBlock} />
          <AnimePageInfo openAddBlock={openAddBlock} setVisibleTrailer={setVisibleTrailer} />
        </AnimeInfoBox>
        <AnimeEpisodes />
        <AnimeReviewsItem />
      </Container>
    </AnimeInfoWrapper>
  );
};

export default AnimePage;

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

const AnimeInfoBox = styled.div`
  position: relative;
`;

export const Box = styled.div`
  display: ${(props: AnimeBox) => (props.slider ? 'block' : 'flex')};
  background-color: #212121;
  width: 100%;
  ${(props: AnimeBox) => (props.reviews ? 'min-height: 0;' : 'min-height: 250px;')}
  ${(props: AnimeBox) => (props.reviews ? 'padding: 25px;' : 'padding: 55px;')}
  border-radius: 40px;
  z-index: 10;
  ${(props: AnimeBox) => (props.slider || props.reviews ? 'border-top-left-radius: 0;' : '')};
  @media ${device.mobile} {
    padding: 20px;
  }
`;

const BlockOutInfo = styled.div`
  position: fixed;
  ${(props: IBlockOutInfo) => (props.show ? 'visibility: visible' : 'visibility: hidden')};
  top: 0;
  transition: all 0.2s ease;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 700;
`;
