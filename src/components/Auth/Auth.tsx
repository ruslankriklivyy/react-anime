import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { loginUser } from '../../redux/users';
import Login from './Login';

import closeSvg from '../../assets/img/cancel.svg';

const AuthBlock = styled.div`
  position: absolute;
  visibility: ${(props: IAuthBlock) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props: IAuthBlock) => (props.show ? '1' : '0')};
  transition: all 0.3s ease;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
  width: 500px;
  min-height: 500px;
  background-color: #212121;
  padding: 20px;
  border-radius: 20px;
  h4 {
    font-size: 43px;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 55px;
  }
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    button {
      width: 100%;
      height: 55px;
      background-color: #f1b32e;
      border: none;
      color: #fff;
      font-size: 25px;
      letter-spacing: 1px;
      font-weight: 600;
      border-radius: 10px;
      cursor: pointer;
      outline: none;
    }
    a {
      color: #fff;
      font-size: 22px;
      position: absolute;
      bottom: -60px;
    }
    input {
      width: 100%;
      height: 55px;
      background: transparent;
      border: 2px solid #f1b32e;
      padding: 15px;
      margin-bottom: 25px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: 500;
      outline: none;
      color: #fff;
    }
    span {
      display: block;
      text-align: left;
      margin-right: auto;
      margin-top: -15px;
      margin-bottom: 25px;
    }
  }
`;

const AuthBlockWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  button {
    display: block;
    width: 20px;
    height: 20px;
    margin-left: auto;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    &:active {
      transform: translateY(7px);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

interface IAuthBlock {
  show: boolean;
}

interface IAuth {
  visibleAuth: boolean;
  toggleVisibleAuth: () => void;
  blockOutRef: React.RefObject<HTMLDivElement>;
  onCloseAuth: () => void;
}

const Auth: React.FC<IAuth> = ({ visibleAuth, blockOutRef, toggleVisibleAuth, onCloseAuth }) => {
  const dispatch = useDispatch();

  const onSendUser = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCloseAuth();
      }
    },
    [onCloseAuth],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (
        e.target.className &&
        blockOutRef.current &&
        e.target.className === blockOutRef.current.className
      ) {
        onCloseAuth();
      }
    },
    [blockOutRef, onCloseAuth],
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
    visibleAuth
      ? document.querySelector<HTMLElement>('body')?.setAttribute('style', 'overflow: hidden')
      : document.querySelector<HTMLElement>('body')?.setAttribute('style', 'overflow: auto');
  }, [visibleAuth]);

  return (
    <AuthBlock show={visibleAuth}>
      <AuthBlockWrapper>
        <button onClick={() => toggleVisibleAuth()}>
          <img src={closeSvg} alt="close svg" />
        </button>
        <h4>Login</h4>
        <Login onSendUser={onSendUser} toggleVisibleAuth={toggleVisibleAuth} />
      </AuthBlockWrapper>
    </AuthBlock>
  );
};

export default Auth;
