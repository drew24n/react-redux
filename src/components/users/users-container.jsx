import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/with-auth-redirect";
import Users from "./users";
import {getUsers, setFollow, setPortionNumber, setUnfollow} from "../../redux/users-reducer";
import {getPageNumber} from "../../redux/users-reducer";
import Preloader from "../common/preloader/preloader";

const UsersContainer = (props) => {
    useEffect(() => {
        const getUsers = props.getUsers;
        getUsers(props.pageNumber, props.pageSize)
    }, [props.getUsers, props.pageNumber, props.pageSize]);

    if (props.isFetching === true) {
        return <Preloader/>
    } else {
        return <Users {...props}/>
    }
};

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    pageSize: state.users.pageSize,
    pageNumber: state.users.pageNumber,
    portionNumber: state.users.portionNumber,
    portionSize: state.users.portionSize,
    usersCount: state.users.usersCount,
    isFollowInProcess: state.users.isFollowInProcess,
    isFetching: state.app.isFetching,
    users: state.users.users
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: (pageNumber, pageSize) => dispatch(getUsers(pageNumber, pageSize)),
    getPageNumber: (pageNumber, pageSize) => dispatch(getPageNumber(pageNumber, pageSize)),
    setPortionNumber: (portionNumber) => dispatch(setPortionNumber(portionNumber)),
    follow: (userId) => dispatch(setFollow(userId)),
    unfollow: (userId) => dispatch(setUnfollow(userId))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer);