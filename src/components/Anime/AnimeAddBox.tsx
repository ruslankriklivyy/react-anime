import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import removeSvg from '../../assets/img/cancel.svg';
import { AttributesAnime } from '../..//interfaces/interfaces';
import { RootState } from '../../redux';
import { addToList } from '../../redux/list';
import { device } from '../../utils/deviceMedia';
import scrollTop from '../../utils/scrollTop';

const typesList = ['Plan to watch', 'Checked', 'Liked', "Didn't like it."];

interface IBlockOutInfo {
  show: boolean;
}

interface IAnimeAddBox {
  closeAddBlock: () => void;
  visibleAddBlock: boolean;
}

const AnimeAddBox: React.FC<IAnimeAddBox> = ({ closeAddBlock, visibleAddBlock }) => {
  const dispatch = useDispatch();
  const { chosenAnime } = useSelector((state: RootState) => state.anime);

  const addAnimeToList = (type: string, obj: AttributesAnime) => {
    const newObj = {
      id: Number(chosenAnime.data.id),
      titles: obj.titles,
      startDate: obj.startDate,
      synopsis: obj.synopsis,
      averageRating: obj.averageRating,
      posterImage: obj.posterImage,
      type,
    };

    dispatch(
      addToList({
        category: type.split(' ').join('_'),
        item: newObj,
      }),
    );

    closeAddBlock();
  };

  return (
    <AnimeAddedBox show={visibleAddBlock}>
      <span onClick={() => closeAddBlock()}>
        <img src={removeSvg} alt="remove svg" />
      </span>
      <h4>Add to:</h4>
      {typesList.map((name, index) => (
        <button key={index} onClick={() => addAnimeToList(name, chosenAnime.data.attributes)}>
          {name}
        </button>
      ))}
    </AnimeAddedBox>
  );
};

export default React.memo(AnimeAddBox);

const AnimeAddedBox = styled.div`
  ${(props: IBlockOutInfo) => (props.show ? 'visibility: visible' : 'visibility: hidden')};
  ${(props: IBlockOutInfo) => (props.show ? 'opacity: 1' : 'opacity: 0')};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  z-index: 900;
  min-height: 400px;
  transform: translate(-50%, -50%);
  background-color: #212121;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  transition: all 0.2s ease;

  span {
    display: block;
    margin-left: auto;
    transition: all 0.2s ease;
    cursor: pointer;
    &:active {
      transform: translateY(5px);
    }
    img {
      width: 17px;
      height: 17px;
    }
  }
  h4 {
    font-size: 42px;
    margin-bottom: 10px;
  }
  button {
    margin-top: 15px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    background: transparent;
    color: #fff;
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 22px;
    border: 2px solid #ffb400;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:active {
      transform: translateY(5px);
    }
    &:hover {
      background-color: #ffb400;
    }
  }
  @media ${device.mobile} {
    width: 90%;
    h4 {
      font-size: 28px;
    }
    button {
      font-size: 20px;
    }
  }
`;
