import React, { useState, useEffect } from 'react';
import MUSIC_LIST from '../config/musiclist';
import Header from '../components/Header';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import Player, { RepeatType } from './Player';

function MusicPlayer () {
    const [ list, setList ] = useState(MUSIC_LIST);
    const [ curMusicItem, setCurMusicItem ] = useState({});
    const [ repeatType, setRepeatType ] = useState(RepeatType.CYCLE);

    const playMusic = (item) => {
        $("#player").jPlayer("setMedia", {
            mp3: item.file
        }).jPlayer('play');

        setCurMusicItem(item);
    };

    const findMusicIndex = (music) => {
        const index = list.indexOf(music);
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
        setCurMusicItem(musicItem);
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
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });

        playMusic(list[0]);

        $('#player').bind($.jPlayer.event.ended, () => {
            playWhenEnd();
        });

        PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
            playMusic(item);
        });

        PubSub.subscribe('DEL_MUSIC', (msg, item) => {
            setList(list.filter(music => music !== item));
        });

        PubSub.subscribe('PLAY_NEXT', () => {
            playNext();
        });

        PubSub.subscribe('PLAY_PREV', () => {
            playNext('prev');
        });

        PubSub.subscribe('CHANGE_REPEAT', () => {
            //获得循环状态在数组中的索引，每次点击索引加1，因为数组长度为3，所以%3，则索引一直会在0~2之间
            const index = (repeatType + 1) % 3;
            setRepeatType(RepeatType[index]);
        });

        return () => {
            PubSub.unsubscribe('PLAY_MUSIC');
            PubSub.unsubscribe('DEL_MUSIC');
            PubSub.unsubscribe('CHANGE_REPEAT');
            PubSub.unsubscribe('PLAY_NEXT');
            PubSub.unsubscribe('PLAY_PREV');
        };
    }, []);

    return (
        <div className="container">
            <Header />
            {/* <List musicList={MUSIC_LIST} currentMusicItem='' /> */}
            <Player currentMusicItem={curMusicItem} repeatType={repeatType} />
            {/* {   React.cloneElement(this.props.children, this.state) } */}
        </div>
    );
}

export default MusicPlayer;
