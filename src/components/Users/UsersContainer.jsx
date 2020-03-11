import {connect} from "react-redux";
import Users from "./Users";
import {follow, setCurrentPage, setIsFetching, setUsers, setUsersAmount, unfollow} from "../../redux/users-reducer";
import axios from "axios";
import React from "react";
import Preloader from "../common/Preloader/Preloader";

class UsersComponent extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
            {withCredentials: true}).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersAmount(response.data.totalCount);
            this.props.setIsFetching(false);
        });
    }

    switchPage = (p) => {
        this.props.setCurrentPage(p);
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`,
            {withCredentials: true}).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setIsFetching(false);
        });
    };

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Users switchPage={this.switchPage}
                      users={this.props.users}
                      usersAmount={this.props.usersAmount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
        />
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

let UsersContainer = connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setUsersAmount, setIsFetching})(UsersComponent);

export default UsersContainer;