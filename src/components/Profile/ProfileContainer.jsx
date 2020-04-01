import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {editMode, getProfile, getStatus, updateProfileInfo, updateStatus} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let usersId = this.props.match.params.usersId;
        if (!this.props.match.params.usersId) usersId = this.props.myId;
        this.props.getUserProfile(usersId);
        this.props.getUserStatus(usersId);
    }

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Profile {...this.props}/>
        </>
    }
}

let mapStateToProps = (state) => ({
    userProfile: state.profile.userProfile,
    isFetching: state.profile.isFetching,
    status: state.profile.status,
    profileEditStatus: state.profile.profileEditStatus,
    isAuth: state.auth.isAuth,
    myId: state.auth.id,
});

let mapDispatchToProps = (dispatch) => ({
    getUserProfile: (usersId) => dispatch(getProfile(usersId)),
    getUserStatus: (usersId) => dispatch(getStatus(usersId)),
    updateUserStatus: (status) => dispatch(updateStatus(status)),
    updateProfile: (info) => dispatch(updateProfileInfo(info)),
    profileEditMode: (value) => dispatch(editMode(value)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter,
)(ProfileContainer);