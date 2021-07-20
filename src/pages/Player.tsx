import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import Progress from '../components/Progress';
import '../static/common.css';
import './player.css';

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
    const [ volume, setVolume ] = useState(0.5);
    const [ leftTime, setLeftTime ] = useState('0:00');
    const [ isPlay, setIsPlay ] = useState(true);
    const duration = useRef(0);
    const audioPlayer = useRef<Howl>(null);

    const formatTime = (time: DOMHighResTimeStamp) => {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return minutes + ':' + (seconds > 10 ? seconds : '0' + seconds);
    };

    const changeVolumeHandle = (progress) => {
    };

    const changeProgressHandle = (progress) => {
    };

    const prev = () => {
    };

    const play = () => {
    };

    const next = () => {
    };

    const changeRepeat = () => {
    };

    useEffect(() => {
        audioPlayer.current = new Howl({
            src: [props.currentMusicItem.file],
            html5: true,
            volume: volume
        });
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
