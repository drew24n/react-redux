import React from "react";
import style from "./messages.module.css";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";

const Messages = (props) => {
    let onSendMessage = (value) => props.sendMessage(value.message);

    let dialogItem = props.dialogItem.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messageItem = props.messageItem.map(m => <MessageItem content={m.content} id={m.id} key={m.id}/>);

    return (
        <div className={style.container}>
            <div>
                <div className={style.dialogs_container}>
                    <div>{dialogItem}</div>
                </div>
                <div className={style.text_container}>
                    <div>{messageItem}</div>
                </div>
            </div>
            <MessageReduxForm onSubmit={onSendMessage}/>
        </div>
    )
};

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.form}>
            <Field placeholder="type your message" name={"message"} component={"input"}/>
            <button>Send message</button>
        </form>
    )
};

const MessageReduxForm = reduxForm({
    form: "message"
})(MessageForm);

export default Messages;