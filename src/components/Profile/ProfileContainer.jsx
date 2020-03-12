import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setIsFetchingAC, setUserProfileAC} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {API} from "../api/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        let usersId = this.props.match.params.usersId;
        if (!usersId) {usersId = 2}
        API.getProfile(usersId).then(response => {
            this.props.setUserProfile(response);
            this.props.setIsFetching(false);
        })
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
    setUserProfile: (userProfile) => dispatch(setUserProfileAC(userProfile)),
    setIsFetching: (isFetching) => dispatch(setIsFetchingAC(isFetching)),
});

let ProfileWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithRouter);