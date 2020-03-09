import React from "react";
import style from "./my_posts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let onTypePost = (e) => {
        let text = e.target.value;
        props.typePostFunc(text)
    };
    let onAddPost = () => props.addPost();
    let postItem = props.postItems.map(p => <Post post={p.post} likes={p.likes} userPic={props.picture} key={p.id}/>);

    return (
        <div className={style.container}>
            <h3>My posts:</h3>
            <textarea className={style.textarea} onChange={onTypePost} value={props.typePost} placeholder="write your post!"/>
            <button onClick={onAddPost}>Add new post</button>
            <div>{postItem}</div>
        </div>
    )
};

export default MyPosts;