import React from "react";
import {Container} from "./profile-style";
import ProfileStatus from "./profile-status/profile-status";
import {Button, Image, ListGroup} from "react-bootstrap";
import img from "../../assets/images/default-user-picture.png";
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/forms/forms";
import {maxLength} from "../common/forms/forms-validators";
import {Form} from "react-bootstrap";

const Profile = (props) => {
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.updateProfilePhoto(e.target.files[0])
        }
    };

    const Contacts = ({contactName, contactValue}) => contactValue
        ? <ListGroup.Item variant="info">{contactName}: {contactValue}</ListGroup.Item>
        : null;

    return (
        <Container className={"d-flex flex-wrap flex-column justify-content-center align-items-center"}>
            <ListGroup>
                <label htmlFor={"custom-photo-input"} className={"profile-photo-label d-flex align-self-center"}>
                    <Image className={"rounded-circle profile-photo"}
                           src={props.profile.photos.large !== null ? props.profile.photos.large : img}/>
                    {props.isOwner &&
                    <input type={"file"} onChange={onPhotoSelected} id={"custom-photo-input"}/>}
                </label>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
                {props.profileEditMode === false && props.isOwner &&
                <Button className={"d-flex align-self-center shadow-none edit-profile-btn mb-3"} variant={"primary"}
                        onClick={() => props.setProfileEditMode(true)}>Edit profile</Button>
                }
            </ListGroup>
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center"}>
                {props.profileEditMode === false &&
                <>
                    <div className={"group-title"}>General info:</div>
                    {props.profile.fullName !== null &&
                    <ListGroup.Item variant="info">Name: {props.profile.fullName}</ListGroup.Item>}
                    {props.profile.aboutMe !== null &&
                    <ListGroup.Item variant="info">About me: {props.profile.aboutMe}</ListGroup.Item>}
                    {props.profile.lookingForAJob === true &&
                    <ListGroup.Item variant="info">Looking for a job <span role={"img"}
                                                                           aria-label="">&#9989;</span></ListGroup.Item>}
                    {props.profile.lookingForAJobDescription !== null &&
                    <ListGroup.Item variant="info">Job
                        description: {props.profile.lookingForAJobDescription}</ListGroup.Item>}
                </>
                }
            </ListGroup>
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center"}>
                {props.profileEditMode === false
                    ? <>
                        <div className={"group-title"}>Contacts:</div>
                        {Object.keys(props.profile.contacts).map(key =>
                            <Contacts key={key} contactName={key} contactValue={props.profile.contacts[key]}/>)
                        }</>
                    : <ProfileReduxForm initialValues={props.profile} onSubmit={props.updateProfileInfo}
                                        profile={props.profile} setProfileEditMode={props.setProfileEditMode}/>
                }
            </ListGroup>
        </Container>
    );
};

const maxLength25 = maxLength(25);

const EditProfileInfo = (props) => {
    return (
        <Form as={"form"} onSubmit={props.handleSubmit} className={"d-flex flex-wrap justify-content-around"}>
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center"}>
                <div className={"group-title"}>General info:</div>
                <ListGroup.Item>Name:
                    <Form.Control as={Field} name={"fullName"} component={Input} type={"input"}
                                  validate={[maxLength25]}/>
                </ListGroup.Item>
                <ListGroup.Item>About me:
                    <Form.Control as={Field} name={"aboutMe"} component={Input} type={"input"}
                                  validate={[maxLength25]}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Form.Check as={Field} name={"lookingForAJob"} component={"input"} type={"checkbox"}
                                label={"Looking for a job"}/></ListGroup.Item>
                <ListGroup.Item>Job description:
                    <Form.Control as={Field} component={Input} name={"lookingForAJobDescription"}
                                  validate={[maxLength25]}/>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center"}>
                <div className={"group-title"}>Contacts:</div>
                {Object.keys(props.profile.contacts).map(key =>
                    <ListGroup.Item key={key}>{key}:
                        <Form.Control as={Field} name={"contacts." + key} placeholder={key} component={Input}
                                      validate={[maxLength25]}/>
                    </ListGroup.Item>)}
            </ListGroup>
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center"}>
                <Button as={"button"} className={"shadow-none text-center save-btn"}>Save changes</Button>
                <Button onClick={() => props.setProfileEditMode(false)}
                        className={"text-center cancel-btn"}>Cancel</Button>
                <div>{props.error}</div>
            </ListGroup>
        </Form>
    )
};

const ProfileReduxForm = reduxForm({
    form: "profileInfo"
})(EditProfileInfo);

export default Profile;