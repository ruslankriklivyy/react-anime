import React from 'react';
import styled from 'styled-components';

const Button = (props: any) => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  display: block;
  background-color: transparent;
  padding: 12px 24px;
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 2px solid #ffb400;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:active {
    transform: translateY(7px);
  }
  &:hover {
    background-color: #ffb400;
  }
`;

export default Button;
