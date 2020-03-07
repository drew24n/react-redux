import React from "react";
import style from "./MessageItem.module.css";

const MessageItem = (props) => {
    return (
        <div className={style.message_item}>
            <div>{props.content}</div>
        </div>
    )
};

export default MessageItem;