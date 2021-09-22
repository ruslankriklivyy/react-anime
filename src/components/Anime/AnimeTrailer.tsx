import React from 'react';
import styled from 'styled-components';

import closeSvg from '../../assets/img/close.svg';

interface AnimeTrailerProps {
  show: boolean;
}

interface IAnimeTrailer {
  youtubeVideoId: string;
  closeTrailer: () => void;
  visibleTrailer: boolean;
}

export const AnimeTrailer: React.FC<IAnimeTrailer> = ({
  youtubeVideoId,
  closeTrailer,
  visibleTrailer,
}) => {
  const blockOutRef = React.useRef<HTMLDivElement>(null);

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeTrailer();
      }
    },
    [closeTrailer],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (
        e.target.className &&
        blockOutRef.current &&
        e.target.className === blockOutRef.current.className
      ) {
        closeTrailer();
      }
    },
    [blockOutRef, closeTrailer],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return (
    <AnimeTrailerWrapper show={visibleTrailer}>
      <button onClick={() => closeTrailer()}>
        <img src={closeSvg} alt="close svg" />
      </button>
      <iframe
        data-frameborder="0"
        data-allowfullscreen
        title="trailer"
        width="468"
        height="460"
        src={`https://www.youtube.com/embed/${youtubeVideoId}?showinfo=0`}></iframe>
    </AnimeTrailerWrapper>
  );
};

const AnimeTrailerWrapper = styled.div`
  position: relative;
  padding-bottom: ${(props: AnimeTrailerProps) => (props.show ? '56.25%' : '0')};
  border-radius: 30px;
  height: 0;
  overflow: hidden;
  z-index: 400;
  margin-bottom: 40px;
  transition: all 0.3s ease;

  button {
    width: 40px;
    height: 40px;
    top: 80px;
    right: -4px;
    position: absolute;
    z-index: 600;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    &:active {
      transform: translateY(7px);
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-width: 0;
    outline-width: 0;
  }
`;
