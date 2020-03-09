import React from "react";
import style from "./followers.module.css";

const Followers = (props) => {
    let followerItem = props.users.map(f => f.followed === true ? (<div key={f.id}>{f.name}</div>) : "");

    return (
        <div className={style.container}>
            <h3>Followers:</h3>
            <div className={style.item}>{followerItem}</div>
        </div>
    )
};

export default Followers;