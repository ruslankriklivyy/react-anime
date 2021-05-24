import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux';

import trashSvg from '../../assets/img/trash-white.svg';
import plusSvg from '../../assets/img/plus.svg';
import scrollTop from '../../utils/scrollTop';
import { removeItemFromList, removeTypeFromList } from '../../redux/list';
import { Button } from '..';

const AnimeInfoBottom = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 10px;
  }
`;

const AnimeButtonPlus = styled.button`
  background-color: transparent;
  padding: 12px 15px;
  border: 2px solid #ffb400;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ffb400;
  }
  &:active {
    transform: translateY(7px);
  }
  img {
    display: block;
    width: 21px;
    height: 21px;
  }
`;

interface IAnimeInfoActions {
  setVisibleTrailer: (visible: boolean) => void;
  setVisibleAddBlock: (visible: boolean) => void;
}

const AnimeInfoActions: React.FC<IAnimeInfoActions> = ({
  setVisibleTrailer,
  setVisibleAddBlock,
}) => {
  const dispatch = useDispatch();
  const { addedItemsIds } = useSelector((state: RootState) => state.list);
  const { chosenAnime } = useSelector((state: RootState) => state.anime);
  const storageListTypeById = JSON.parse(localStorage.getItem('listTypeById') || '{}');

  const openTrailer = () => {
    setVisibleTrailer(true);
    scrollTop();
  };

  const removeAnimeFromList = () => {
    const type = storageListTypeById[chosenAnime.data.id].type;

    dispatch(removeItemFromList({ id: chosenAnime.data.id, type }));
    dispatch(removeTypeFromList(type));
  };

  return (
    <AnimeInfoBottom>
      <Button onClick={() => openTrailer()}>Watch Trailer</Button>
      {!addedItemsIds.includes(chosenAnime.data.id) ? (
        <AnimeButtonPlus onClick={() => setVisibleAddBlock(true)}>
          <img src={plusSvg} alt="plus svg" />
        </AnimeButtonPlus>
      ) : (
        <Button red onClick={() => removeAnimeFromList()}>
          <img src={trashSvg} alt="trashSvg" />
        </Button>
      )}
    </AnimeInfoBottom>
  );
};

export default AnimeInfoActions;
