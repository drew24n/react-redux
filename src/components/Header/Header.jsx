import React from "react";
import style from "./header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    let userLogout = () => props.Logout();

    return (
        <header className={style.container}>
            <span className={style.title}>Social network!</span>
            {props.isAuth
                ? <div className={style.authorized}>
                    <div>Hello,<br/>{props.login}</div>
                    <button onClick={userLogout}>Logout</button>
                </div>
                : <div className={style.unauthorized}><p>Not authorized!</p>
                    <NavLink to={"/login"}>
                        <button>Login</button>
                    </NavLink>
                </div>}
        </header>
    )
};

export default Header;