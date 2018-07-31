import React from 'react';
import Progress from '../components/progress';
import './player.less';
import {Link} from 'react-router';
import $ from 'jquery';
import 'jplayer';

let duration = null;
class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            progress: '20',
            volume: '',
            leftTime: '0:00',
            isPlay: true
        };
        this.changeVolumeHandle = this.changeVolumeHandle.bind(this);
        this.changeProgressHandle = this.changeProgressHandle.bind(this);
        this.prev = this.prev.bind(this);
        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, e => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        })
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    formatTime(time) {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return minutes + ':' + (seconds > 10 ? seconds : '0' + seconds);
    }

    changeVolumeHandle(progress) {
        $('#player').jPlayer('volume', progress);
    }

    changeProgressHandle(progress) {
        console.log(progress);
        $('#player').jPlayer('play',duration * progress);
        this.setState({
            isPlay: true
        });
    }

    prev() {

    }

    play() {
        if(this.state.isPlay) {
            $('#player').jPlayer('pause');
        }else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    next() {

    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onChangeProgress={this.changeVolumeHandle}
                                        barColor='#aaa'
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress
                                progress={this.state.progress}
                                onChangeProgress={this.changeProgressHandle}
                                barColor='#f40'
                            />
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.prev}></i>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                                <i className="icon next ml20" onClick={this.next}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;