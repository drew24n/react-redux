import {connect} from "react-redux";
import Users from "./Users";
import {followAC, isFollowProcessAC, setCurrentPageAC, setIsFetchingAC, setUsersAC, setUsersAmountAC, unfollowAC} from "../../redux/users-reducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {API} from "../api/api";

class UsersComponent extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        API.getUsers(this.props.currentPage, this.props.pageSize).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersAmount(response.data.totalCount);
            this.props.setIsFetching(false);
        });
    }

    changePage = (p) => {
        this.props.setCurrentPage(p);
        this.props.setIsFetching(true);
        API.getUsers(p, this.props.pageSize).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setIsFetching(false);
        });
    };

    followUser = (userId) => {
        this.props.isFollowProcess(true, userId);
        API.follow(userId).then(response => {
            if (response.resultCode === 0) {this.props.follow(userId)}
            this.props.isFollowProcess(false, userId);
        })
    };

    unfollowUser = (userId) => {
        this.props.isFollowProcess(true, userId);
        API.unfollow(userId).then(response => {
            if (response.resultCode === 0) {this.props.unfollow(userId)}
            this.props.isFollowProcess(false, userId)
        })
    };

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Users changePage={this.changePage}
                   users={this.props.users}
                   usersAmount={this.props.usersAmount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   followUser={this.followUser}
                   unfollowUser={this.unfollowUser}
                   isFollowInProcess={this.props.isFollowInProcess}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        usersAmount: state.usersPage.usersAmount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowInProcess: state.usersPage.isFollowInProcess
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => dispatch(followAC(userId)),
        unfollow: (userId) => dispatch(unfollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
        setUsersAmount: (usersAmount) => dispatch(setUsersAmountAC(usersAmount)),
        setIsFetching: (isFetching) => dispatch(setIsFetchingAC(isFetching)),
        isFollowProcess: (isInProcess, userId) => dispatch(isFollowProcessAC(isInProcess, userId))
    }
};

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default UsersContainer;