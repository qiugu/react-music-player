import React from 'react';
import './listitem.less';
import {PubSub} from 'pubsub-js';
import 'jquery';

class ListItem extends React.Component {
    constructor() {
        super();
    }

    playMusic(item) {
        PubSub.publish('PLAY_MUSIC',item);
    }

    deleteHandle(item,event) {
        console.log(event);
        event.stopPropagation();
        PubSub.publish('DEL_MUSIC',item);
    }

    render() {
        const item = this.props.data;
        return (
          <li className={`row components-listItem ${this.props.focus ? 'focus' : ''}`}
            onClick={this.playMusic.bind(this, item)}>
              <p><span className="bold">{item.title}</span> - {item.artist}</p>
              <p className="-col-auto delete" onClick={this.deleteHandle.bind(this, item)}/>
          </li>
        );
    }
}

export default ListItem;