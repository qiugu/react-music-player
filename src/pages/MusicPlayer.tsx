import React from 'react';
import MUSIC_LIST from '../config/musiclist';
import Header from '../components/Header';
import List from './List';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import Player from './Player';

export default class MusicPlayer extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: {},
            repeatType: 'cycle'
        };
    }

    componentDidMount() {
        const repeatList = ['cycle', 'once', 'random'];

        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });

        console.log(this.state.musicList);
        this.playMusic(this.state.musicList[0]);

        $('#player').bind($.jPlayer.event.ended, () => {
            this.playWhenEnd();
        });

        PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
            this.playMusic(item);
        });

        PubSub.subscribe('DEL_MUSIC', (msg, item) => {
            this.setState({
                musicList: this.state.musicList.filter(music => {
                    return music !== item;
                })
            });
            console.log(this.state.musicList);
        });

        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });

        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });

        PubSub.subscribe('CHANGE_REPEAT', () => {
            //获得循环状态在数组中的索引，每次点击索引加1，因为数组长度为3，所以%3，则索引一直会在0~2之间
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            })
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DEL_MUSIC');
        PubSub.unsubscribe('CHANGE_REPEAT');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
    }

    playMusic(item) {
        console.log(item);
        $("#player").jPlayer("setMedia", {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
    }

    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex = Math.random() * (this.state.musicList.length - 1);
            while (randomIndex === index) {
                randomIndex = Math.random() * (this.state.musicList.length - 1);
            }
            this.playMusic(this.state.musicList[randomIndex]);
        } else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusicItem);
        } else {
            this.playNext();
        }
    }

    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        if (type === 'next') {
            index = (index + 1) % this.state.musicList.length;
        } else {
            index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
        }
        let musicItem = this.state.musicList[index];
        this.setState({
            currentMusicItem: musicItem
        });
        this.playMusic(musicItem)
    }

    findMusicIndex(music) {
        let index = this.state.musicList.indexOf(music);
        return Math.max(0, index);
    }

    render() {
        return (
            <div className="container">
                <Header />
                {/* <List musicList={MUSIC_LIST} currentMusicItem='' /> */}
                <Player currentMusicItem={this.state.currentMusicItem}
                    repeatType={this.state.repeatType} />
                {/* {   React.cloneElement(this.props.children, this.state) } */}
            </div>
        );
    }
}
