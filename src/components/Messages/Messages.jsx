import React from "react";
import style from "./messages.module.css";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Messages = (props) => {
    let onTypeMessage = (e) => {
        let text = e.target.value;
        props.typeMessageFunc(text)
    };
    let onSendMessage = () => props.sendMessage();

    let dialogItem = props.dialogItem.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messageItem = props.messageItem.map(m => <MessageItem content={m.content} id={m.id} key={m.id}/>);

    return (
        <div className={style.container}>
            <div className={style.dialogs_container}>{dialogItem}</div>
            <div className={style.content_container}>{messageItem}</div>
            <textarea onChange={onTypeMessage} value={props.typeMessage} placeholder="type your message">{}</textarea>
            <button onClick={onSendMessage}>Send message</button>
        </div>
    )

};

export default Messages;