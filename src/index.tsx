import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CookiesProvider } from 'react-cookie';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
    text-decoration: none;
    &::selection {
      background-color: #f1b32e;
      color: #fff;
    }
  }
  html {
    &::-webkit-scrollbar {
      width: 0;
    }
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: #181818;
    color: #fff;
    
  }
  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  p {
    padding: 0;
    margin: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <CookiesProvider>
          <Global />
          <App />
        </CookiesProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
