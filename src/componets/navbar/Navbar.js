import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import React from 'react';
import {useNavigate} from "react-router-dom";


const Navbar = ({sidebarOpen, openSidebar}) => {
    const navigation = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigation('/')

    };
    return (
        <nav className="navbars">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fas fa-bars"></i>

            </div>
            <div className="navbar__left">

            </div>
            <div className="navbar__right">
                <div>
                    <i className="fa fa-search"></i>
                </div>
                <div onClick={logout}>
                    <i className="fa fa-power-off"></i>
                </div>
                <div>
                    <img width="30" src={avatar} alt="avatar"/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;