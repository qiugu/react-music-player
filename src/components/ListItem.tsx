import React from 'react';
import './listitem.css';

interface IListItem {
    data: any;
    focus: boolean;
}

function ListItem (props: IListItem) {
    const playMusic = (item) => () => {
    };

    const deleteHandle = (item) => (e) => {
        e.stopPropagation();
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
