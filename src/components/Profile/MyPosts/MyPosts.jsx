import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let on_typing_post = (e) => {
        let current_text = e.target.value;
        props.typing_post(current_text)
    };

    let on_add_post = () => props.add_post();

    let post_item = props.post_items.map(p => <Post post={p.post} likes={p.likes} user_pic={props.picture} key={p.id}/>);

    return (
        <div className={style.posts_wrapper}>
            <h3>My posts:</h3>
            <div><textarea onChange={on_typing_post} value={props.typing} placeholder="write your post!"/></div>
            <div><button onClick={on_add_post}>Add new post</button></div>
            <div>{post_item}</div>
        </div>
    )
};

export default MyPosts;