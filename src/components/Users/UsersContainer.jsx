import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setCurrentPageAC, setIsFetchingAC, setUsersAC, setUsersAmountAC, unfollowAC} from "../../redux/users_reducer";
import axios from "axios";
import React from "react";
import Preloader from "../common/Preloader/Preloader";

class UsersComponent extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.current_page}&count=${this.props.page_size}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersAmount(response.data.totalCount);
            this.props.setIsFetching(false);
        });
    }

    switchPage = (p) => {
        this.props.setCurrentPage(p);
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.page_size}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setIsFetching(false);
        });
    };

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Users switchPage={this.switchPage}
                      users={this.props.users}
                      users_amount={this.props.users_amount}
                      page_size={this.props.page_size}
                      current_page={this.props.current_page}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
        />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        users_amount: state.usersPage.users_amount,
        page_size: state.usersPage.page_size,
        current_page: state.usersPage.current_page,
        isFetching: state.usersPage.isFetching,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setUsersAmount: (usersAmount) => {
            dispatch(setUsersAmountAC(usersAmount))
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingAC(isFetching))
        },
    }
};

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default UsersContainer;