import React from "react";
import style from "./navbar.module.css";
import {NavLink} from "react-router-dom";
import FollowersContainer from "./Followers/FollowersContainer";

const NavBar = () => {
    return (
        <nav className={style.container}>
            <NavLink to="/profile" className={style.link} activeClassName={style.active}>Profile</NavLink>
            <NavLink to="/messages" className={style.link} activeClassName={style.active}>Messages</NavLink>
            <NavLink to="/weather" className={style.link} activeClassName={style.active}>Weather</NavLink>
            <NavLink to="/settings" className={style.link} activeClassName={style.active}>Settings</NavLink>
            <NavLink to="/users" className={style.link} activeClassName={style.active}>Users</NavLink>
            <FollowersContainer/>
        </nav>
    )
};

export default NavBar;