import React from "react";
import style from "./ProfileInfo.module.css";
import defaultProfilePicture from "../../../assets/images/default_user_pic.png"

const ProfileInfo = (props) => {
    return (
        <div className={style.profile_info}>
            <img src={props.user_info.picture.path === undefined ? defaultProfilePicture : props.user_info.picture.path} alt=""/>
            {props.user_info.description.map(d => <div>{d.name}{d.age}{d.country}</div>)}
        </div>
    )
};

export default ProfileInfo;