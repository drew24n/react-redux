import React from "react";
import style from "./Post.module.css";
import defaultProfilePicture from "../../../../assets/images/default_user_pic.png"

const Post = (props) => {
    return (
        <div className={style.post_wrapper}>
            <div>
                <img src={props.user_pic === undefined ? defaultProfilePicture : props.user_pic} alt=""/>
                <span>Likes: {props.likes}</span>
            </div>
            <div className={style.post_item}>{props.post}</div>
        </div>
    )
};

export default Post;