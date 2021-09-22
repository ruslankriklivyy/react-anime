import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { RootState } from '../../redux';
import { getAnime } from '../../redux/anime';
import { AnimeItemLoader } from '../LoaderContent/AnimeItemLoader';
import { AnimeItem } from './AnimeItem';

interface IAnimeSlider {
  onSelectAnime: (id: number) => void;
}

export const AnimeSlider: React.FC<IAnimeSlider> = React.memo(function AnimeSlider({
  onSelectAnime,
}) {
  const dispatch = useDispatch();
  const { animeItems, isLoading } = useSelector((state: RootState) => state.anime);

  React.useEffect(() => {
    dispatch(getAnime());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerPadding: '-6px',
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 792,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
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
  );
});
