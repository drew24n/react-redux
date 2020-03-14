import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";

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
});

let mapDispatchToProps = (dispatch) => ({
    getUserProfile: (usersId) => dispatch(getProfile(usersId)),
});

let ProfileWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithRouter);