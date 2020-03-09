import React from "react";
import style from "./profile_info.module.css";
import defaultProfilePicture from "../../../assets/images/default_user_pic.png"

const ProfileInfo = (props) => {
    return (
        <div>
            <img src={props.userInfo.picture.path === ""
                ? defaultProfilePicture
                : props.userInfo.picture.path}
                 className={style.img} alt=""/>
            {props.userInfo.description.map(d => <div key={d.id}>
                <div>Name: {d.name}</div>
                <div>Age: {d.age}</div>
                <div>Country: {d.country}</div>
            </div>)}
        </div>
    )
};

export default ProfileInfo;