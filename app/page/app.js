import React from 'react';
import Header from '../components/header';
import '../static/reset.css';
import List from './list.js';
import MUSIC_LIST from '../../config/musiclist';
import Player from './player.js';
import $ from 'jquery';

class App extends React.Component {
    constructor() {
        super();
        this.changeProgressHandle = this.changeProgressHandle.bind(this);
    }

    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });

        this.playMusic(MUSIC_LIST[1]);
    }

    playMusic(item) {
        $("#player").jPlayer("setMedia", {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusitItem: item
        });
    }

    changeProgressHandle() {

    }

    render() {
        return (
            <div>
                <Header/>
                {/*    <List musicList={MUSIC_LIST} currentMusicItem=''/>  */}
                <Player currentMusicItem={MUSIC_LIST[1]}/>
            </div>
        );
    }
}

export default App;