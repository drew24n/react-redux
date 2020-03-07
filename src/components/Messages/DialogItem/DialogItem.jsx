import React from "react";
import style from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={style.dialog_item}>
            <NavLink to={`/messages/${props.id}`} activeClassName={style.active_dialog}>{props.name}</NavLink>
        </div>
    )
};

export default DialogItem;