import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    function handleLilk() {
        if (props.loggedIn) {
            props.onSignOut();
        }
    }

    return (
        <header className="header">
            <img src={logo} alt="Логотип Mesto" className="header__logo" />
            <div className="header__info">
                <p className="header__email">{props.email}</p>
                <Link to={props.link.url} className="header__link" onClick={handleLilk} >{props.link.name}</Link>
            </div>
        </header>
    );
}

export default Header;