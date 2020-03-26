import React from "react";
import style from "./message_item.module.css";

const MessageItem = React.memo((props) => {
    return (
        <div className={style.container}>
            <div>{props.content}</div>
        </div>
    )
});

export default MessageItem;