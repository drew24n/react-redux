import React from "react"
import {Container, CustomJobCheckbox, CustomPhotoInput} from "./profile-style"
import ProfileStatus from "./profile-status/profile-status"
import {Button, Image, ListGroup, OverlayTrigger, Spinner, Tooltip} from "react-bootstrap"
import img from "../../assets/images/default-user-picture.png"
import {reduxForm, Field} from "redux-form"
import {Input} from "../common/forms/input"
import {maxLength} from "../common/forms/validators"
import {Form} from "react-bootstrap"

const Profile = (props) => {
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.updateProfilePhoto(e.target.files[0])
        }
    }

    const Contacts = ({contactName, contactValue}) => contactValue
        ? <ListGroup.Item variant="info">{contactName}: {contactValue}</ListGroup.Item>
        : null

    return (
        <Container className={"d-flex flex-wrap flex-column justify-content-center align-items-center"}>
            <ListGroup>
                {props.isOwner === true
                    ? <OverlayTrigger key={"bottom"} placement={"bottom"} overlay={
                        <Tooltip id={"tooltip-bottom"}>click to update photo!</Tooltip>}>
                        <CustomPhotoInput htmlFor={"custom-photo-input"}
                               className={"d-flex align-self-center"}>
                            <Image className={"rounded-circle profile-photo"}
                                   src={props.profile.photos.large !== null ? props.profile.photos.large : img}/>
                            {props.isOwner &&
                            <input type={"file"} onChange={onPhotoSelected} id={"custom-photo-input"}/>
                            }
                        </CustomPhotoInput>
                    </OverlayTrigger>
                    : <Image className={"rounded-circle profile-photo m-auto"}
                             src={props.profile.photos.large !== null ? props.profile.photos.large : img}/>
                }
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
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
                    <ListGroup.Item variant="info">Looking for a job:<span role={"img"} aria-label="">&#9989;</span>
                    </ListGroup.Item>}
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
                        }
                    </>
                    : <ProfileReduxForm initialValues={props.profile} onSubmit={props.updateProfileInfo}
                                        profile={props.profile} setProfileEditMode={props.setProfileEditMode}
                                        profileEditInProcess={props.profileEditInProcess}/>
                }
            </ListGroup>
            <ListGroup>{props.profileEditMode === false && props.isOwner &&
            <Button className={"d-flex align-self-center shadow-none edit-profile-btn"} variant={"primary"}
                    onClick={() => props.setProfileEditMode(true)}>Edit profile
            </Button>}
            </ListGroup>
        </Container>
    )
}

const maxLength25 = maxLength(25)

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
                    <CustomJobCheckbox htmlFor="default-checkbox">Looking for a job
                        <Field type="checkbox" id="default-checkbox" name="lookingForAJob" component={"input"}/>
                        <span/>
                    </CustomJobCheckbox>
                </ListGroup.Item>
                <ListGroup.Item>Job desc.:
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
                    </ListGroup.Item>)
                }
            </ListGroup>
            {props.error &&
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center w-100"}>
                <ListGroup.Item className={"response-error text-center mb-3"}>Error: {props.error}</ListGroup.Item>
            </ListGroup>
            }
            <ListGroup className={"d-flex flex-wrap flex-row text-center justify-content-center"}>
                <Button as={"button"} className={"shadow-none text-center save-btn"}
                        disabled={props.profileEditInProcess}>Save changes
                    {props.profileEditInProcess === true &&
                    <Spinner className={"ml-1"} as="span" animation="border" size="sm" role="status"
                             aria-hidden="true"/>
                    }
                </Button>
                <Button onClick={() => props.setProfileEditMode(false)}
                        className={"text-center cancel-btn"}>Cancel</Button>
            </ListGroup>
        </Form>
    )
}

const ProfileReduxForm = reduxForm({
    form: "profileInfo"
})(EditProfileInfo)

export default Profile