import React from 'react';
import styled from 'styled-components';
import { Container } from '../App';

import { Categories, HeaderActions } from '.';

const HeaderWrapper = styled.header`
  padding-top: 25px;
  height: 90px;
  width: 100%;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 35px;
  letter-spacing: 1px;
  color: #f1b32e;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <HeaderTop>
          <Title>React Anime</Title>
          <Categories />
          <HeaderRight>
            <HeaderActions />
          </HeaderRight>
        </HeaderTop>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
