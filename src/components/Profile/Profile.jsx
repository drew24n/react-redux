import React from "react";
import style from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";

const Profile = () => {
    return (
        <div className={style.profile}>
            <ProfileInfoContainer/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;