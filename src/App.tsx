import React from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';
import { Anime, Header } from './components';
import { AnimeInfo, AnimeList, Users } from './pages';

export const Container = styled.div`
  max-width: 1430px;
  padding: 0 15px;
  margin: 0 auto;
`;

function App() {
  return (
    <div className="app">
      <Header />
      <Route exact path={['/', '/home']} component={Anime} />
      <Route path="/info" component={AnimeInfo} />
      <Route path="/animelist" component={AnimeList} />
      <Route path="/users" component={Users} />
    </div>
  );
}

export default App;
