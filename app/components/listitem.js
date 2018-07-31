import React from 'react';
import './listitem.less';
import PubSub from 'pubsub-js';
import 'jquery';

class ListItem extends React.Component {
    constructor() {
        super();
        this.playMusic = this.playMusic.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    playMusic(item) {
        PubSub.publish('PLAY_MUSIC',item);
    }

    deleteHandle(item,event) {
        console.log(event);
        PubSub.publish('DEL_MUSIC',item);
    }

    render() {
        const item = this.props.data;
        return (
          <li className={`components-listItem row${this.props.focus ? 'focus' : ''}`}
            onClick={this.playMusic}>
              <p><span className="bold">{item.title}</span> - {item.artist}</p>
              <p className="-col-auto delete" onClick={this.deleteHandle}/>
          </li>
        );
    }
}

export default ListItem;