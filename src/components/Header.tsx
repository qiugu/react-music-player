import React from 'react';
import './header.css';
import '../static/common.css';
import logo from '../images/logo.png';

function Header () {
    return (
        <div className="row components_logo">
            <img src={logo} alt="logo" width="40" className="-col-auto"/>
            <h1 className="caption">Music Player By React</h1>
        </div>
    );
}

export default Header;
