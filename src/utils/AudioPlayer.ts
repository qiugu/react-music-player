import { Howl, Howler } from 'howler';
import { formatTime } from './helper';

enum IDirection {
  PREV,
  NEXT
}

export interface IPlayerItem {
  id: number;
  title: string;
  artist: string;
  file: string;
  cover: string;
  howl?: Howl;
}

interface IAudioPlayer {
  list: IPlayerItem[];
  index: number;
  duration: string;
  progress: string;
  curItem: IPlayerItem;
}

class AudioPlayer implements IAudioPlayer {
  public list: IPlayerItem[] = []; // 播放列表
  public index: number = 0; // 播放列表索引
  public duration: string = '0:00'; // 当前音频的持续时长
  public progress: string = '0:00'; // 当前音频播放的位置
  public curItem: IPlayerItem; // 当前正在播放的实例

  constructor (list: IPlayerItem[]) {
    this.list = list;
    this.curItem = list[0];
  }

  /**
   * 播放指定索引的音频
   * @param index 播放音频的索引
   */
  play (index: number) {
    index = typeof index === 'number' ? index : this.index;
    this.curItem = this.list[index];

    let sound: Howl;

    // 如果已经存在实例了，则使用实例播放
    if (this.curItem.howl) {
      sound = this.curItem.howl;
    } else {
      sound = this.curItem.howl = new Howl({
        src: [this.curItem.file],
        html5: true,
        onplay: () =>{
          const duration = formatTime(Math.round(sound.duration() || 0));
          this.duration = duration;
        },
        onseek: () => {
          requestAnimationFrame(this.step);
        }
      })
    }

    sound.play();

    this.index = index;
  }

  pause () {
    if (!this.curItem.howl) throw new Error('当前音频不存在!');
    this.curItem.howl.pause();
  }

  /**
   * 播放上一个或下一个音频
   * @param direction 
   */
  skip (direction: IDirection) {
    let index = 0;
    switch (direction) {
      case IDirection.PREV:
        index = this.index - 1;
        if (index < 0) {
          index = this.list.length - 1;
        }
        break;
      case IDirection.NEXT:
        index = this.index + 1;
        if (index > this.list.length - 1) {
          index = 0;
        }
        break;
    }

    this.skipTo(index);
  }

  /**
   * 跳转到指定索引的音频进行播放
   * @param index 
   */
  skipTo (index: number) {
    // 停止当前播放的音频
    if (this.curItem.howl !== undefined) {
      this.curItem.howl.stop();
    }

    // 重置播放
    this.play(index);
  }

  volume (val: number) {
    Howler.volume(val);
  }

  seek (per: number) {
    if (!this.curItem.howl) throw new Error('当前音频不存在!');
    if (this.curItem.howl.playing()) {
      this.curItem.howl.seek(this.curItem.howl.duration() * per);
    }
  }

  step () {
    if (!this.curItem.howl) throw new Error('当前音频不存在!');
    const seek = (this.curItem.howl.seek() as number) || 0;
    this.progress = formatTime(Math.round(seek));

    if (this.curItem.howl.playing()) {
      requestAnimationFrame(this.step);
    }
  }
}

export default AudioPlayer;
