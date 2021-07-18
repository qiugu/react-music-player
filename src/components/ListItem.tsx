import React from 'react';
import './listitem.css';
import PubSub from 'pubsub-js';
import 'jquery';

interface IListItem {
    data: any;
    focus: boolean;
}

function ListItem (props: IListItem) {
    const playMusic = (item) => () => {
        PubSub.publish('PLAY_MUSIC',item);
    };

    const deleteHandle = (item) => (e) => {
        e.stopPropagation();
        PubSub.publish('DEL_MUSIC', item);
    };

    return (
        <li className={`row components-listItem ${props.focus ? 'focus' : ''}`}
          onClick={playMusic(props.data)}>
            <p><span className="bold">{props.data.title}</span> - {props.data.artist}</p>
            <p className="-col-auto delete" onClick={deleteHandle(props.data)}/>
        </li>
    );
}

export default ListItem;
