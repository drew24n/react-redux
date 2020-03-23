import React from "react";
import style from "./profile_info.module.css";
import defaultProfilePicture from "../../../assets/images/default_user_pic.png"
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    return (
        <div className={style.container}>
            <img className={style.img} src={!props.userProfile.photos.small ? defaultProfilePicture : props.userProfile.photos.small} alt=""/>
            <div className={style.description}>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} myId={props.myId}/>
                {!props.userProfile.userId ? "" : <div>User ID: {props.userProfile.userId}</div>}
                {!props.userProfile.fullName ? "" : <div>Login: {props.userProfile.fullName}</div>}
                {!props.userProfile.aboutMe ? "" : <div>About: {props.userProfile.aboutMe}</div>}
                {!props.userProfile.contacts.facebook ? "" : <div>Facebook: {props.userProfile.contacts.facebook}</div>}
                {!props.userProfile.contacts.website ? "" : <div>Website: {props.userProfile.contacts.website}</div>}
                {!props.userProfile.contacts.vk ? "" : <div>Vk: {props.userProfile.contacts.vk}</div>}
                {!props.userProfile.contacts.twitter ? "" : <div>Twitter: {props.userProfile.contacts.twitter}</div>}
                {!props.userProfile.contacts.instagram ? "" : <div>Instagram: {props.userProfile.contacts.instagram}</div>}
                {!props.userProfile.contacts.youtube ? "" : <div>Youtube: {props.userProfile.contacts.youtube}</div>}
                {!props.userProfile.contacts.github ? "" : <div>GitHub: {props.userProfile.contacts.github}</div>}
                {!props.userProfile.contacts.mainLink ? "" : <div>MainLink: {props.userProfile.contacts.mainLink}</div>}
                {!props.userProfile.lookingForAJob ? "" : <div>I'm looking for a job</div>}
                {!props.userProfile.lookingForAJobDescription ? "" : <div>Job description: {props.userProfile.lookingForAJobDescription}</div>}
            </div>
        </div>
    )
};

export default ProfileInfo;