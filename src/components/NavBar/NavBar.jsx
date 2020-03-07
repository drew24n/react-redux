import React from "react";
import style from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import MyFriendsContainer from "./MyFriends/MyFriendsContainer";

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div className={style.item}><NavLink to="/profile" activeClassName={style.active}>Profile</NavLink></div>
            <div className={style.item}><NavLink to="/messages" activeClassName={style.active}>Messages</NavLink></div>
            <div className={style.item}><NavLink to="/weather" activeClassName={style.active}>Weather</NavLink></div>
            <div className={style.item}><NavLink to="/settings" activeClassName={style.active}>Settings</NavLink></div>
            <div className={style.item}><NavLink to="/users" activeClassName={style.active}>Users</NavLink></div>
            <MyFriendsContainer/>
        </nav>
    )
};

export default NavBar;