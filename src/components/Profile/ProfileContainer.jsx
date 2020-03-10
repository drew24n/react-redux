import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import axios from "axios";
import {setIsFetching, setUserProfile} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        let usersId = this.props.match.params.usersId;
        if (!usersId) {usersId = 2}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + usersId).then(response => {
            this.props.setUserProfile(response.data);
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

let ProfileWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile, setIsFetching})(ProfileWithRouter);