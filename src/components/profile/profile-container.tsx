import React, {ComponentType, FC, useEffect} from "react"
import {Action, compose} from "redux"
import {connect} from "react-redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/with-auth-redirect"
import Profile from "./profile"
import Preloader from "../common/preloader/preloader"
import {
    getProfile,
    getStatus,
    setProfileEditMode,
    updateProfileInfo,
    updateProfilePhoto,
    updateStatus
} from "../../redux/profile-reducer"
import {stateType} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {profile} from "../../api/api-profile";

type mapStateTopProps = {
    ownerId: number
    isFetching: boolean
    profile: profile
    status: string
    profileEditMode: boolean
    isAuthorized: boolean
    profileEditInProcess: boolean
    isOwner: boolean
}

type mapDispatchToProps = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updateProfilePhoto: (photo: File) => void
    updateProfileInfo: (info: profile) => void
    setProfileEditMode: (profileEditMode: boolean) => void
}

type userIdRoute = {
    userId: string
}

export type propsType = mapStateTopProps & mapDispatchToProps & RouteComponentProps<userIdRoute>

const ProfileContainer: FC<propsType> = (props) => {
    let userId = props.match.params.userId
    if (!props.match.params.userId) userId = String(props.ownerId)

    useEffect(() => {
        const getProfile = props.getProfile
        const getStatus = props.getStatus
        getProfile(Number(userId))
        getStatus(Number(userId))
    }, [props.getProfile, props.getStatus, userId])

    if (props.isFetching) {
        return <Preloader/>
    } else {
        return <Profile {...props} isOwner={!props.match.params.userId}/>
    }
}

const mapStateToProps = (state: stateType) => ({
    ownerId: state.auth.id,
    isFetching: state.app.isFetching,
    profile: state.profile.profile,
    status: state.profile.status,
    profileEditMode: state.profile.profileEditMode,
    isAuthorized: state.auth.isAuthorized,
    profileEditInProcess: state.profile.profileEditInProcess
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateType, undefined, Action>) => ({
    getProfile: (userId: number) => dispatch(getProfile(userId)),
    getStatus: (userId: number) => dispatch(getStatus(userId)),
    updateStatus: (status: string) => dispatch(updateStatus(status)),
    updateProfilePhoto: (photo: File) => dispatch(updateProfilePhoto(photo)),
    updateProfileInfo: (info: profile) => dispatch(updateProfileInfo(info)),
    setProfileEditMode: (profileEditMode: boolean) => dispatch(setProfileEditMode(profileEditMode))
})

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(ProfileContainer)
