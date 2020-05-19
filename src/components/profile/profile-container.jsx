import React, {useEffect} from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
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

const ProfileContainer = (props) => {
    let userId = props.match.params.userId
    if (!props.match.params.userId) userId = props.ownerId

    useEffect(() => {
        const getProfile = props.getProfile
        const getStatus = props.getStatus
        getProfile(userId)
        getStatus(userId)
    }, [props.getProfile, props.getStatus, userId])

    if (props.isFetching === true) {
        return <Preloader/>
    } else {
        return <Profile {...props} isOwner={!props.match.params.userId}/>
    }
}

const mapStateToProps = (state) => ({
    ownerId: state.auth.id,
    isFetching: state.app.isFetching,
    profile: state.profile.profile,
    status: state.profile.status,
    profileEditMode: state.profile.profileEditMode,
    isAuthorized: state.auth.isAuthorized,
    profileEditInProcess: state.profile.profileEditInProcess
})

const mapDispatchToProps = (dispatch) => ({
    getProfile: (userId) => dispatch(getProfile(userId)),
    getStatus: (userId) => dispatch(getStatus(userId)),
    updateStatus: (status) => dispatch(updateStatus(status)),
    updateProfilePhoto: (photo) => dispatch(updateProfilePhoto(photo)),
    updateProfileInfo: (info) => dispatch(updateProfileInfo(info)),
    setProfileEditMode: (profileEditMode) => dispatch(setProfileEditMode(profileEditMode))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(ProfileContainer)