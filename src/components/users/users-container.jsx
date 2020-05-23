import React, {useEffect} from "react"
import {compose} from "redux"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/with-auth-redirect"
import Users from "./users"
import {
    getUsers,
    setFollow,
    getFriends,
    setPortionNumber,
    setUnfollow,
    setSearchTerm,
    setPageNumber
} from "../../redux/users-reducer"
import Preloader from "../common/preloader/preloader"

const UsersContainer = (props) => {
    useEffect(() => {
        const getUsers = props.getUsers
        getUsers(props.pageNumber, props.pageSize)
    }, [props.getUsers, props.pageNumber, props.pageSize])

    useEffect(() => {
        const getFriends = props.getFriends
        getFriends()
    }, [props.getFriends])

    if (props.isFetching === true) {
        return <Preloader/>
    } else {
        return <Users {...props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    pageSize: state.users.pageSize,
    pageNumber: state.users.pageNumber,
    portionNumber: state.users.portionNumber,
    portionSize: state.users.portionSize,
    usersCount: state.users.usersCount,
    isFollowInProcess: state.users.isFollowInProcess,
    isFetching: state.app.isFetching,
    users: state.users.users,
    friends: state.users.friends,
    term: state.users.term
})

const mapDispatchToProps = (dispatch) => ({
    getUsers: (pageNumber, pageSize, isFriend, term) => dispatch(getUsers(pageNumber, pageSize, isFriend, term)),
    getPageNumber: (pageNumber) => dispatch(setPageNumber(pageNumber)),
    setPortionNumber: (portionNumber) => dispatch(setPortionNumber(portionNumber)),
    follow: (userId) => dispatch(setFollow(userId)),
    unfollow: (userId) => dispatch(setUnfollow(userId)),
    getFriends: (pageNumber, pageSize, isFriend) => dispatch(getFriends(pageNumber, pageSize, isFriend)),
    setSearchTerm: (term) => dispatch(setSearchTerm(term))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer)