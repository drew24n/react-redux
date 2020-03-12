import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setCurrentPageAC, setIsFetchingAC, setUsersAC, setUsersAmountAC, unfollowAC} from "../../redux/users-reducer";
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

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Users changePage={this.changePage}
                   users={this.props.users}
                   usersAmount={this.props.usersAmount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
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
    }
};

let mapDispatchToProps = (dispatch) => ({
    follow: (userId) => dispatch(followAC(userId)),
    unfollow: (userId) => dispatch(unfollowAC(userId)),
    setUsers: (users) => dispatch(setUsersAC(users)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
    setUsersAmount: (usersAmount) => dispatch(setUsersAmountAC(usersAmount)),
    setIsFetching: (isFetching) => dispatch(setIsFetchingAC(isFetching)),
});

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default UsersContainer;