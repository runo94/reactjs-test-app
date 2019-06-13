import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, NavLink } from "react-router-dom";
import UserMenu from './UserMenu'

import logo from './logo.svg'

class Header extends React.Component {
    render(){
        return (
            <header className="header">
                <Link to={'/'}>
                    <img className="logo" src={logo} />
                </Link>
                <nav className="headerNavMenu">
                    <UserMenu/>
                </nav>
            </header>
        )
    }
}

export default Header;