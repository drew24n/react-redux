import React from "react";
import style from "./MyFriends.module.css";

const MyFriends = (props) => {
    let friend_item = props.users.map(f => {
        let status = () => f.followed === true ? (<div key={f.id}>{f.name}</div>) : "";
        return status();
    });

    return (
        <div className={style.friends_wrapper}>
            <h3>My friends:</h3>
            <div className={style.friend_item}>{friend_item}</div>
        </div>
    )
};

export default MyFriends;