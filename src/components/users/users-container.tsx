import React, {ComponentType, FC, useEffect} from "react"
import {Action, compose} from "redux"
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
// import Preloader from "../common/preloader/preloader"
import {stateType} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {userItem} from "../../api/api-users";

type mapStateToProps = {
    isAuthorized: boolean
    pageSize: number
    pageNumber: number
    portionNumber: number
    portionSize: number
    usersCount: number
    isFollowInProcess: Array<boolean | number>
    isFetching: boolean
    users: Array<userItem>
    friends: Array<userItem>
    term: string
    isFriendsListFetching: boolean
}

type mapDispatchToProps = {
    getUsers: (pageNumber: number, pageSize: number, isFriend: boolean, term: string) => void
    getPageNumber: (pageNumber: number) => void
    setPortionNumber: (portionNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getFriends: () => void
    setSearchTerm: (term: string) => void
}

export type propsType = mapStateToProps & mapDispatchToProps

const UsersContainer: FC<propsType> = (props) => {
    useEffect(() => {
        const getUsers = props.getUsers
        getUsers(props.pageNumber, props.pageSize, false, props.term)
    }, [props.getUsers, props.pageNumber, props.pageSize, props.term])

    // if (props.isFetching) {
    //     return <Preloader/>
    // } else {
        return <Users {...props}/>
    // }
}

const mapStateToProps = (state: stateType) => ({
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
    term: state.users.term,
    isFriendsListFetching: state.users.isFriendsListFetching
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateType, undefined, Action>) => ({
    getUsers: (pageNumber: number, pageSize: number, isFriend: boolean) => dispatch(getUsers(pageNumber, pageSize, isFriend)),
    getPageNumber: (pageNumber: number) => dispatch(setPageNumber(pageNumber)),
    setPortionNumber: (portionNumber: number) => dispatch(setPortionNumber(portionNumber)),
    follow: (userId: number) => dispatch(setFollow(userId)),
    unfollow: (userId: number) => dispatch(setUnfollow(userId)),
    getFriends: () => dispatch(getFriends()),
    setSearchTerm: (term: string) => dispatch(setSearchTerm(term))
})

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer)
