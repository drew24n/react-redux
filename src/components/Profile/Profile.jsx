import React from "react";
import style from "./profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";

const Profile = (props) => {
    return (
        <div className={style.container}>
            <ProfileInfoContainer userProfile={props.userProfile}/>
            <MyPostsContainer userPic={props.userProfile.photos.small}/>
        </div>
    )
};

export default Profile;