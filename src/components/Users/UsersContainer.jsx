import {connect} from "react-redux";
import Users from "./Users";
import {changePage, followUser, requestUsers, setFractionProcessAC, unfollowUser} from "../../redux/users-reducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getIsAuth,
    getIsFetching,
    getIsFollowInProcess,
    getPageSize,
    getUsersSelector,
    getUsersAmount,
    getCurrentFraction,
    getFractionSize
} from "../../redux/selectors/users-selector";

class UsersComponent extends React.Component {
    componentDidMount() {this.props.setUsers(this.props.currentPage, this.props.pageSize)}
    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Users changePage={this.props.setCurrentPage}
                   users={this.props.users}
                   usersAmount={this.props.usersAmount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   followUser={this.props.follow}
                   unfollowUser={this.props.unfollow}
                   isFollowInProcess={this.props.isFollowInProcess}
                   changeFraction={this.props.setFraction}
                   currentFraction={this.props.currentFraction}
                   fractionSize={this.props.fractionSize}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        usersAmount: getUsersAmount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowInProcess: getIsFollowInProcess(state),
        isAuth: getIsAuth(state),
        currentFraction: getCurrentFraction(state),
        fractionSize: getFractionSize(state),
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => dispatch(followUser(userId)),
        unfollow: (userId) => dispatch(unfollowUser(userId)),
        setUsers: (currentPage, pageSize) => dispatch(requestUsers(currentPage, pageSize)),
        setCurrentPage: (p, pageSize) => dispatch(changePage(p, pageSize)),
        setFraction: (currentFraction) => dispatch(setFractionProcessAC(currentFraction))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersComponent)