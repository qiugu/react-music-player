import React from 'react';
import './header.less';
import '../static/common.css';

class Header extends React.Component {
    render() {
        return (
          <div className="row components-logo">
              <img src="../images/logo.png" alt="log" width="40" className="-col-auto"/>
              <h1 className="caption">Music Player By React</h1>
          </div>
        );
    }
}

export default Header;