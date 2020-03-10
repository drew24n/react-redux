import React from "react";
import style from "./header.module.css";

const Header = (props) => {
    return (
        <header className={style.container}>
            <span className={style.title}>Social network!</span>
            {props.data.resultCode === 0
                ? <span className={style.authorized}>Hello,<br/>{props.data.data.login}</span>
                : <button type="input" className={style.unauthorized}>Login</button>}
        </header>
    )
};

export default Header;