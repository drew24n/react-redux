import React from "react";
import style from "./profile_info.module.css";
import defaultProfilePicture from "../../../assets/images/default_user_pic.png"
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import {Field, reduxForm} from "redux-form";
import {CustomInput} from "../../common/CustomForms/CustomForm";
import {maxLenght} from "../../../validators/validators";

const maxLenght25 = maxLenght(25);

const ProfileInfo = ({userProfile, status, updateStatus, myId, updateProfile, profileEditMode, profileEditStatus}) => {

    // let [editMode, setIsEdit] = useState(false);
    // const activateEditMode = () => setIsEdit(true);
    // const deactivateEditMode = () => setIsEdit(false);
    // const saveChanges = (value) => {
    //     updateProfile(value).then(() => setIsEdit(false))
    // };

    return (
        <div className={style.container}>
            <img className={style.img} src={!userProfile.photos.small ? defaultProfilePicture : userProfile.photos.small} alt=""/>
            <div className={style.description}>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} myId={myId}/>
                {profileEditStatus
                    ? <LoginReduxForm onSubmit={updateProfile} initialValues={userProfile} userProfile={userProfile}/>
                    : <>
                        {!userProfile.fullName ? "" : <div>Name: {userProfile.fullName}</div>}
                        {!userProfile.aboutMe ? "" : <div>About: {userProfile.aboutMe}</div>}
                        <div>Looking for a job: {!userProfile.lookingForAJob ? "No" : "Yes"}</div>
                        {!userProfile.lookingForAJobDescription ? "" : <div>Job description: {userProfile.lookingForAJobDescription}</div>}
                        <b>Contacts:</b>: {Object.keys(userProfile.contacts).map(key =>
                        <Contacts key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>)}
                    </>
                }
                {!profileEditStatus && <button onClick={() => profileEditMode(true)}>Edit</button>}
                {profileEditStatus && <button onClick={() => profileEditMode(false)}>Cancel</button>}
            </div>
        </div>
    )
};

const Contacts = ({contactTitle, contactValue}) => contactValue ? <div>{contactTitle}: {contactValue}</div> : null;

const EditInfo = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>Name: <Field name={"fullName"} component={CustomInput} validate={[maxLenght25]}/></div>
        <div>About: <Field name={"aboutMe"} component={CustomInput} validate={[maxLenght25]}/></div>
        <div>Looking for a job: <Field name={"lookingForAJob"} component={CustomInput} type={"checkbox"}/></div>
        <div>Job description: <Field name={"lookingForAJobDescription"} component={CustomInput} validate={[maxLenght25]}/></div>
        <div>
            <b>Contacts:</b>: {Object.keys(props.userProfile.contacts).map(key =>
            <div key={key}><b>{key}</b><Field name={"contacts." + key} placeholder={key} component={CustomInput} validate={[maxLenght25]}/></div>)}
        </div>
        <div><button>Save</button></div>
        <div className={style.common_error}>{props.error}</div>
    </form>
};

const LoginReduxForm = reduxForm({
    form: "profileInfo"
})(EditInfo);

export default ProfileInfo;