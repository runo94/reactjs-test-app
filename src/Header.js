import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";

import logo from './logo.svg'

class Header extends React.Component {
    render(){
        return (
            <header className="header">
                <Link to={'/'}>
                    <img className="logo" src={logo} />
                </Link>
                <nav className="headerNavMenu">
                    
                </nav>
            </header>
        )
    }
}

export default Header;