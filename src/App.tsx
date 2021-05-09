import React from 'react';
import './static/reset.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Player from './pages/Player';
import List from './pages/List';
import MusicPlayer from './pages/MusicPlayer';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                  <Route path="/">
                      <MusicPlayer/>
                  </Route>
                  <Route path='/index'>
                    <Player/>
                  </Route>
                  <Route path="/list">
                    <List/>
                  </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;