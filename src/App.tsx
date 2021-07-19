import React from 'react';
import './static/reset.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Player from './pages/Player';
import List from './pages/List';
import MusicPlayer from './pages/MusicPlayer';
import MUSIC_LIST from './config/musiclist';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list">
          <List musicList={MUSIC_LIST} currentMusicItem={MUSIC_LIST[0]} />
        </Route>
        <Route path="/">
          <MusicPlayer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;