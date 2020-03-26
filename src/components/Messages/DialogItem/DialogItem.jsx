import React from "react";
import style from "./dialog_item.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = React.memo((props) => {
    return <NavLink to={`/messages/${props.id}`} className={style.link} activeClassName={style.active}>{props.name}</NavLink>
});

export default DialogItem;