import * as React from "react"
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import './Header.css';

interface HeaderProps {
    isLoggedIn: boolean;
    username: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        setIsLoggedIn(props.isLoggedIn);
    }, [props.isLoggedIn])

    if (isLoggedIn) {
        return (
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/" className="navlink" activeClassName="active-navlink" exact> Home </NavLink></li>
                        <li><p style={{color: 'white'}}>{props.username}</p></li>
                        <li className="logo"></li>
                        <li><NavLink to="/dualnback" className="navlink" activeClassName="active-navlink"> Spil </NavLink></li>
                        <li><NavLink to="/highscore" className="navlink" activeClassName="active-navlink"> Highscores </NavLink></li>
                        <li><Button color="primary" className='HeaderButton' onClick={logOut}>Logout</Button></li>
                    </ul>
                </nav>
            </header>
        )
    }
    return (
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/" className="navlink" activeClassName="active-navlink" exact> Home </NavLink></li>
                    <li><NavLink to="/register" className="navlink" activeClassName="active-navlink"> Register </NavLink></li>
                    <li><NavLink to="/login" className="navlink" activeClassName="active-navlink"> Login </NavLink></li>
                    <li className="logo"></li>
                    <li><NavLink to="/dualnback" className="navlink" activeClassName="active-navlink"> Spil </NavLink></li>
                    <li><NavLink to="/highscore" className="navlink" activeClassName="active-navlink"> Highscores </NavLink></li>
                </ul>
            </nav>
        </header>
    )

    function logOut(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
    }
}

export default Header;