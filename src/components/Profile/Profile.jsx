import React from "react";
import style from "./profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={style.container}>
            <ProfileInfo userProfile={props.userProfile} status={props.status} updateStatus={props.updateUserStatus} myId={props.myId}/>
            <MyPostsContainer userPic={props.userProfile.photos}/>
        </div>
    )
};

export default Profile;