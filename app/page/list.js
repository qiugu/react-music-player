import React from 'react';
import ListItem from '../components/listitem';

class List extends React.Component {
    render() {
        const items = this.props.musicList.map(item => {
            return (
                <ListItem key={item.id}
                          data={item}
                          focus={this.props.currentMusicItem === item}/>
            )
        });

        return (
          <ul>
              {items}
          </ul>
        );
    }
}

export default List;