import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import arrowSvg from '../../assets/img/arrow.svg';
import { RootState } from '../../redux';
import { setCurrentPageNumber } from '../../redux/filters';
import scrollTop from '../../utils/scrollTop';
import Button from '../Button';

const AnimePaginator = () => {
  const dispatch = useDispatch();
  let { currentPageNumber } = useSelector((state: RootState) => state.filters);

  const onPlusPageNumber = () => {
    dispatch(setCurrentPageNumber(currentPageNumber + 20));
    scrollTop();
  };

  const onMinusPageNumber = () => {
    if (currentPageNumber !== 0) {
      dispatch(setCurrentPageNumber(currentPageNumber - 20));
    }
    scrollTop();
  };

  return (
    <AnimePaginatorWrapper>
      {currentPageNumber > 1 && (
        <Button onClick={() => onMinusPageNumber()} paginator previous>
          <img src={arrowSvg} alt="arrow svg" /> <span>Previous Page</span>
        </Button>
      )}
      <Button onClick={() => onPlusPageNumber()} paginator>
        <span>Next Page</span> <img src={arrowSvg} alt="arrow svg" />
      </Button>
    </AnimePaginatorWrapper>
  );
};

export default React.memo(AnimePaginator);

const AnimePaginatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
