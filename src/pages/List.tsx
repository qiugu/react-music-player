import React from 'react';
import ListItem from '../components/ListItem';

export default function List(props: any) {
    const { musicList, currentMusicItem } = props;
    return (
        <ul>
            {
                musicList.map((item: any) => {
                    return (
                        <ListItem key={item.id}
                            data={item}
                            focus={currentMusicItem === item} />
                    )
                })
            }
        </ul>
    )
}
