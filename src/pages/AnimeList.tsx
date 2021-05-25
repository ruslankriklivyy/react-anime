import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../App';
import { AnimeItem } from '../components';
import { RootState } from '../redux';
import { setAnimeId } from '../redux/anime';
import { removeItemFromList, removeTypeFromList, setTypeList } from '../redux/list';

import trashSvg from '../assets/img/trash.svg';
import emptyBoxSvg from '../assets/img/empty-box.svg';
import { device } from '../utils/deviceMedia';

interface IAnimeListEmpty {
  types: boolean;
}

const AnimeList = () => {
  const dispatch = useDispatch();
  const { currentType } = useSelector((state: RootState) => state.list);
  const storageList = JSON.parse(localStorage.getItem('list') || '[]');
  const listItemsTypes = Object.keys(storageList);
  const lists = storageList[currentType]?.items;

  const onSelectAnime = (id: number) => {
    dispatch(setAnimeId(id));
  };

  const onSelectListType = (type: string) => {
    dispatch(setTypeList(type));
  };

  const onRemove = (id: number, type: string) => {
    dispatch(removeItemFromList({ id, type }));
    dispatch(removeTypeFromList(type));
  };

  return (
    <>
      <Container>
        {Object.keys(storageList).length === 0 ? (
          <AnimeListEmpty>
            <img src={emptyBoxSvg} alt="empty box svg" />
            <span>Add anime to the list</span>
          </AnimeListEmpty>
        ) : (
          <>
            <AnimeListTypes>
              {listItemsTypes.map((item: any) => (
                <AnimeListButton
                  key={item}
                  onClick={() => onSelectListType(item)}
                  active={item === currentType}>
                  {item}
                </AnimeListButton>
              ))}
            </AnimeListTypes>
            <AnimeListWrapper>
              {lists?.map(
                (list: any) =>
                  list.type === currentType && (
                    <AnimeListItem>
                      <RemoveButton onClick={() => onRemove(list.id, list.type)}>
                        <img src={trashSvg} alt="trash svg" />
                      </RemoveButton>
                      <AnimeItem
                        key={list.id}
                        item={list}
                        selectItem={() => onSelectAnime(Number(list.id))}
                      />
                    </AnimeListItem>
                  ),
              )}
            </AnimeListWrapper>
          </>
        )}
      </Container>
    </>
  );
};

export default AnimeList;

const AnimeListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const AnimeListButton = styled.button`
  font-weight: 500;
  color: #fff;
  font-size: 20px;
  padding: 8px 20px;
  border: 2px solid #f1b32e;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 20px;
  transition: all 0.2s ease;
  ${(props: any) =>
    props.active ? 'background-color: #f1b32e' : ' background-color: transparent;'};
  &:hover {
    background-color: #f1b32e;
  }
  &:active {
    transform: translateY(5px);
  }
  @media ${device.laptop} {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }
  @media ${device.mobile} {
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 8px;
    margin-left: 8px;
    font-size: 18px;
  }
`;

const AnimeListTypes = styled.div`
  margin-top: 40px;
  background-color: #212121;
  border-radius: 20px;
  padding: 20px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  left: 12px;
  z-index: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease;
  &:active {
    transform: translateY(3px);
  }
  img {
    display: block;
    width: 22px;
    height: 22px;
    opacity: 0.6;
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
  @media ${device.laptop} {
    position: static;
    margin-left: 10px;
    margin-bottom: 3px;
  }
  @media ${device.mobile} {
    margin-left: 30px;
  }
`;

const AnimeListItem = styled.div`
  position: relative;
  margin-right: 40px;
  margin-bottom: 40px;
  &:hover {
    ${RemoveButton} {
      top: -32px;
    }
  }
`;

const AnimeListEmpty = styled.div`
  top: 50%;
  ${(props: IAnimeListEmpty) => (props.types ? 'position: static' : 'position: absolute;')}
  ${(props: IAnimeListEmpty) => (props.types ? '' : 'transform: translate(-50%, -50%);')}
  left: 50%;
  opacity: 0.6;
  text-align: center;
  img {
    display: block;
    margin-bottom: 40px;
  }
  span {
    font-weight: 500;
    font-size: 34px;
    letter-spacing: 1px;
  }
`;
