import React, { useEffect, useRef, useState } from 'react';
import Progress from '../components/Progress';
import '../static/common.css';
import './player.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'jplayer';
import PubSub from 'pubsub-js';

export enum RepeatType {
    CYCLE,
    ONCE,
    RANDOM
};

interface IPlayer {
    currentMusicItem: any;
    repeatType: RepeatType;
};

function Player (props: IPlayer) {
    const [ progress, setProgress ] = useState(20);
    const [ volume, setVolume ] = useState(50);
    const [ leftTime, setLeftTime ] = useState('0:00');
    const [ isPlay, setIsPlay ] = useState(true);
    const duration = useRef(0);

    const formatTime = (time) => {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return minutes + ':' + (seconds > 10 ? seconds : '0' + seconds);
    };

    const changeVolumeHandle = (progress) => {
        $('#player').jPlayer('volume', progress);
    };

    const changeProgressHandle = (progress) => {
        $('#player').jPlayer('play', duration.current * progress);

        setIsPlay(true);
    };

    const prev = () => {
        PubSub.publish('PLAY_PREV');
    };

    const play = () => {
        if (isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        setIsPlay(state => !state);
    };

    const next = () => {
        PubSub.publish('PLAY_NEXT');
    };

    const changeRepeat = () => {
        PubSub.publish('CHANGE_REPEAT');
    };

    useEffect(() => {
        $('#player').bind($.jPlayer.event.timeupdate, e => {
            duration.current = e.jPlayer.status.duration;
            setProgress(e.jPlayer.status.currentPercentAbsolute);
            setVolume(e.jPlayer.options.volume * 100);
            setLeftTime(formatTime(duration.current * (1 - e.jPlayer.status.currentPercentAbsolute / 100)));
        });

        return () => {
            $('#player').unbind($.jPlayer.event.timeupdate);
        };
    }, []);

    return (
        <div className="player-page">
            <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{props.currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{props.currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">-{leftTime}</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{ top: 5, left: -5 }} />
                            <div className="volume-wrapper">
                                <Progress
                                    progress={volume}
                                    onChangeProgress={changeVolumeHandle}
                                    barColor='#aaa'
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ height: 10, lineHeight: '10px' }}>
                        <Progress
                            progress={progress}
                            onChangeProgress={changeProgressHandle}
                            barColor='#f40'
                        />
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" onClick={prev} />
                            <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`} onClick={play} />
                            <i className="icon next ml20" onClick={next} />
                        </div>
                        <div className="-col-auto">
                            <i className={`icon repeat-${props.repeatType}`} onClick={changeRepeat} />
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={props.currentMusicItem.cover} alt={props.currentMusicItem.title} />
                </div>
            </div>
        </div>
    );
}

export default Player;
