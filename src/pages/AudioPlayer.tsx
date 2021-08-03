import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';

import { formatTime } from '../utils/helper';
import Progress from '../components/Progress';

import '../static/common.css';
import './player.css';

enum IDirection {
  PREV,
  NEXT,
  RANDOM
}

export interface IPlayerItem {
  id: number;
  title: string;
  artist: string;
  file: string;
  cover: string;
  howl?: Howl;
}

export enum RepeatType {
  CYCLE,
  ONCE,
  RANDOM
};

interface IPlayer {
  list: IPlayerItem[];
};

function AudioPlayer(props: IPlayer) {
  const index = useRef(0); // 播放列表索引
  const [ duration, setDuration ] = useState('0:00'); // 当前音频的总时长
  const [ timer, setTimer ] = useState('0:00'); // 当前音频播放的时间
  const [ progress, setProgress ] = useState(0); // 当前音频播放的位置
  const [ repeatType, setRepeatType ] = useState(RepeatType.CYCLE); // 音频播放顺序
  const [ isPlay, setIsPlay ] = useState(false);
  const [ volume, setVolume ] = useState(20);

  /**
   * 播放指定索引的音频
   * @param index 播放音频的索引
   */
  const play = (idx?: number) => {
    idx = typeof idx === 'number' ? idx : index.current;
    const data = props.list[idx];

    let sound: Howl;

    // 如果已经存在实例了，则使用实例播放
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true,
        volume: volume / 100,
        onplay () {
          setDuration(formatTime(Math.round(sound.duration() || 0)));
          requestAnimationFrame(step);
        },
        onend () {
          switch (repeatType) {
            case RepeatType.ONCE:
              break;
            case RepeatType.RANDOM:
              skip(IDirection.RANDOM);
              break;
            case RepeatType.CYCLE:
            default:
              skip(IDirection.NEXT);
          }
        },
        onseek () {
          requestAnimationFrame(step);
        }
      })
    }

    sound.play();

    index.current = idx;
    setIsPlay(true);
  };

  const pause = () => {
    const sound = props.list[index.current];
    if (!sound.howl) throw new Error('当前音频不存在!');
    sound.howl.pause();
    setIsPlay(false);
  };

  /**
   * 播放上一个或下一个音频
   * @param direction 
   */
  const skip = (direction: IDirection) => {
    let idx = 0;
    switch (direction) {
      case IDirection.PREV:
        idx = index.current - 1;
        if (idx < 0) {
          idx = props.list.length - 1;
        }
        break;
      case IDirection.NEXT:
        idx = index.current + 1;
        if (idx > props.list.length - 1) {
          idx = 0;
        }
        break;
      case IDirection.RANDOM:
        idx = Math.random() * props.list.length;
        break;
    }

    skipTo(idx);
  };

  /**
   * 跳转到指定索引的音频进行播放
   * @param idx 
   */
  const skipTo = (idx: number) => {
    // 停止当前播放的音频
    const sound = props.list[index.current];
    if (sound.howl !== undefined) {
      sound.howl.stop();
    }

    // setProgress(0);
    // 重置播放
    play(idx);
  };

  const changeVolume = (val: number) => {
    Howler.volume(val);
    setVolume(val * 100);
  };

  const seek = (per: number) => {
    const sound = props.list[index.current];
    if (!sound.howl) {
      throw new Error('当前音频不存在!');
    }
    if (sound.howl.playing()) {
      const pos = sound.howl.duration() * per;
      sound.howl.seek(pos);
      setProgress(pos);
    }
  };

  const step = () => {
    const sound = props.list[index.current];
    if (!sound.howl) throw new Error('当前音频不存在!');
    const seek = (sound.howl.seek() as number) || 0;
    setTimer(formatTime(Math.round(seek)));
    setProgress(((seek / sound.howl.duration()) * 100) || 0);

    if (sound.howl.playing()) {
      requestAnimationFrame(step);
    }
  };

  const changeRepeat = () => {
    switch (repeatType) {
      case RepeatType.CYCLE:
        setRepeatType(RepeatType.ONCE);
        break;
      case RepeatType.ONCE:
        setRepeatType(RepeatType.RANDOM);
        break;
      case RepeatType.RANDOM:
        setRepeatType(RepeatType.CYCLE);
    };
  };

  return (
    <div className="player-page">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
            <div className="controll-wrapper">
                <h2 className="music-title">{props.list[index.current].title}</h2>
                <h3 className="music-artist mt10">{props.list[index.current].artist}</h3>
                <div className="row mt20">
                    <div className="left-time -col-auto">{timer}</div>
                    <div className="volume-container">
                        <i className="icon-volume rt" style={{ top: 5, left: -5 }} />
                        <div className="volume-wrapper">
                            <Progress
                                progress={volume}
                                onChangeProgress={changeVolume}
                                barColor='#aaa'
                            />
                        </div>
                    </div>
                    <div className="left-time -col-auto">{duration}</div>
                </div>
                <div style={{ height: 10, lineHeight: '10px' }}>
                    <Progress
                        progress={progress}
                        onChangeProgress={seek}
                        barColor='#f40'
                    />
                </div>
                <div className="mt35 row">
                    <div>
                        <i className="icon prev" onClick={() => skip(IDirection.PREV)} />
                        <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`} onClick={() => isPlay ? pause() : play()} />
                        <i className="icon next ml20" onClick={() => skip(IDirection.NEXT)} />
                    </div>
                    <div className="-col-auto">
                        <i className={`icon repeat-${repeatType}`} onClick={changeRepeat} />
                    </div>
                </div>
            </div>
            <div className="-col-auto cover">
                <img src={props.list[index.current].cover} alt={props.list[index.current].title} />
            </div>
        </div>
    </div>
  );
}

export default AudioPlayer;
