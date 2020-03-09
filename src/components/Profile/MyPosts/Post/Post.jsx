import React from "react";
import style from "./post.module.css";
import defaultProfilePicture from "../../../../assets/images/default_user_pic.png"

const Post = (props) => {
    return (
        <div className={style.container}>
            <div>
                <img className={style.img} src={props.userPic === "" ? defaultProfilePicture : props.userPic} alt=""/>
                <span className={style.likes}>Likes: {props.likes}</span>
            </div>
            <div className={style.item}>{props.post}</div>
        </div>
    )
};

export default Post;