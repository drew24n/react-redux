import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let usersId = this.props.match.params.usersId;
        this.props.getUserProfile(usersId)
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
    isAuth: state.auth.isAuth,
});

let mapDispatchToProps = (dispatch) => ({
    getUserProfile: (usersId) => dispatch(getProfile(usersId)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter,
)(ProfileContainer);