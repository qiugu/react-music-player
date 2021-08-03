import React, { useState, useEffect } from 'react';
import MUSIC_LIST from '../config/musiclist';
import Header from '../components/Header';
import Player, { RepeatType } from './AudioPlayer';

function MusicPlayer () {
    const [ list, setList ] = useState(MUSIC_LIST);
    const [ curMusicItem, setCurMusicItem ] = useState(MUSIC_LIST[0]);
    const [ repeatType, setRepeatType ] = useState(RepeatType.CYCLE);

    const playMusic = (item) => {

        setCurMusicItem(item);
    };

    const findMusicIndex = (music) => {
        const index = list.findIndex((item) => {
            return item.id === music.id;
        });
        return Math.max(0, index);
    }

    const playNext = (type = 'next') => {
        let index = findMusicIndex(curMusicItem);
        if (type === 'next') {
            index = (index + 1) % list.length;
        } else {
            index = (index + list.length - 1) % list.length;
        }
        const musicItem = list[index];
        playMusic(musicItem);
    };

    const playWhenEnd = () => {
        switch(repeatType) {
            case RepeatType.RANDOM: {
                const index = findMusicIndex(curMusicItem);
                let randomIndex = Math.random() * (list.length - 1);
                while (randomIndex === index) {
                    randomIndex = Math.random() * (list.length - 1);
                }
                playMusic(list[randomIndex]);
                break;
            }
            case RepeatType.ONCE: {
                playMusic(curMusicItem);
                break;
            }
            default: 
                playNext();
        }
    };

    useEffect(() => {

        playMusic(list[0]);


        // return () => {
        //     PubSub.unsubscribe('PLAY_MUSIC');
        //     PubSub.unsubscribe('DEL_MUSIC');
        //     PubSub.unsubscribe('CHANGE_REPEAT');
        //     PubSub.unsubscribe('PLAY_NEXT');
        //     PubSub.unsubscribe('PLAY_PREV');
        // };
    }, []);

    return (
        <div className="container">
            <Header />
            {/* <List musicList={MUSIC_LIST} currentMusicItem='' /> */}
            <Player list={list} />
            {/* {   React.cloneElement(this.props.children, this.state) } */}
        </div>
    );
}

export default MusicPlayer;
