import React from "react";
import style from "./my_posts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLenght, required} from "../../../validators/validators";
import {CustomTextarea} from "../../common/CustomForms/CustomForm";

const maxLenght20 = maxLenght(20);

const MyPosts = (props) => {
    let onAddPost = (value) => props.addPost(value.post);

    let postItem = props.postItems.map(p => <Post post={p.post} likes={p.likes} userPic={props.picture} key={p.id}/>);

    return (
        <div className={style.container}>
            <h3>My posts:</h3>
            <MyPostsReduxForm onSubmit={onAddPost}/>
            <div>{postItem}</div>
        </div>
    )
};

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={style.textarea} placeholder="write your post!" component={CustomTextarea} name={"post"}
                   validate={[required, maxLenght20]}/>
            <button>Add new post</button>
        </form>
    )
};

const MyPostsReduxForm = reduxForm({
    form: "posts"
})(MyPostsForm);

export default MyPosts;