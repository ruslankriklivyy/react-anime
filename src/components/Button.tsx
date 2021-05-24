import React from 'react';
import styled from 'styled-components';

const Button = (props: any) => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  background-color: transparent;
  padding: 12px 24px;
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  ${(props: any) => (props.paginator ? 'display: flex' : 'display: block;')};
  align-items: center;
  ${(props: any) => (props.red ? 'border: 2px solid #cf140d;' : 'border: 2px solid #ffb400;')};
  &:active {
    transform: translateY(7px);
  }
  &:hover {
    ${(props: any) => (props.red ? 'background-color: #cf140d;' : 'background-color: #ffb400;')};
  }
  img {
    display: block;
    width: 24px;
    height: 24px;
    ${(props: any) => props.previous && 'transform: rotate(180deg);'};
  }
  span {
    padding: 0 10px;
  }
`;

export default Button;
