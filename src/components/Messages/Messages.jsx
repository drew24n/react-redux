import React from "react";
import style from "./Messages.module.css";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Messages = (props) => {

    let on_type_message = (e) => {
        let text_typing = e.target.value;
        props.type_message(text_typing)
    };

    let on_send_message = () => props.send_message();

    let dialog_item = props.dialog_item.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let message_item = props.message_item.map(m => <MessageItem content={m.content} id={m.id} key={m.id}/>);

    return (
        <div className={style.messages_wrapper}>
            <div className={style.dialog_item}>{dialog_item}</div>
            <div className={style.message_item}>{message_item}</div>
            <div className={style.send_message}>
                <textarea onChange={on_type_message} value={props.write_message}
                placeholder="type your message">{}</textarea>
                <button onClick={on_send_message}>Send message</button>
            </div>
        </div>
    )

};

export default Messages;