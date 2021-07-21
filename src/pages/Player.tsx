import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer, { IPlayerItem } from '../utils/AudioPlayer';
import Progress from '../components/Progress';
import '../static/common.css';
import './player.css';

export enum RepeatType {
    CYCLE,
    ONCE,
    RANDOM
};

interface IPlayer {
    list: IPlayerItem[];
    repeatType: RepeatType;
};

function Player (props: IPlayer) {
    const [ currentMusic, setCurrentMusic ] = useState<IPlayerItem | null>(null);
    const [ progress, setProgress ] = useState(0);
    const [ volume, setVolume ] = useState(50);
    const [ leftTime, setLeftTime ] = useState('0:00');
    const [ isPlay, setIsPlay ] = useState(false);
    const audioPlayer = useRef<AudioPlayer | null>(null);

    const changeVolumeHandle = (progress: number) => {
        setVolume(progress * 100);
        audioPlayer.current?.volume(progress);
    };

    const changeProgressHandle = (progress: number) => {
    };

    const prev = () => {
    };

    const play = () => {
        if (isPlay) {
            audioPlayer.current?.pause();
        } else {
            audioPlayer.current?.play(audioPlayer.current.index);
        }
        isPlay ? audioPlayer.current?.pause() : audioPlayer.current?.play(audioPlayer.current.index);
        setIsPlay(prev => !prev);
    };

    const next = () => {
    };

    const changeRepeat = () => {
    };

    useEffect(() => {
        audioPlayer.current = new AudioPlayer(props.list);
        audioPlayer.current.volume(volume / 100);
        setCurrentMusic(audioPlayer.current.curItem);
    }, []);

    return (
        <div className="player-page">
            <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{currentMusic?.title}</h2>
                    <h3 className="music-artist mt10">{currentMusic?.artist}</h3>
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
                    <img src={currentMusic?.cover} alt={currentMusic?.title} />
                </div>
            </div>
        </div>
    );
}

export default Player;
