import React from "react";
import style from "./profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";

const Profile = () => {
    return (
        <div className={style.container}>
            <ProfileInfoContainer/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;