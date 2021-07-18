import React from 'react';
import ListItem from '../components/ListItem';

interface IList {
    musicList: any[];
    currentMusicItem: any;
}

function List(props: IList) {
    const { musicList, currentMusicItem } = props;
    return (
        <ul>
            {
                musicList.map((item: any) => {
                    return (
                        <ListItem 
                            key={item.id}
                            data={item}
                            focus={currentMusicItem === item} 
                        />
                    )
                })
            }
        </ul>
    )
}

export default List;
