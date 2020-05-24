import {apiUsers} from "../api/api"
import {setErrorMessage, setIsFetching} from "./app-reducer"

const SET_USERS = "SET_USERS"
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER"
const SET_PORTION_NUMBER = "SET_PORTION_NUMBER"
const SET_USERS_COUNT = "SET_USERS_COUNT"
const SET_FRIENDS = "SET_FRIENDS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_IS_FOLLOWING = "SET_IS_FOLLOWING"
const SET_SEARCH_TERM = "SET_SEARCH_TERM"
const IS_FRIENDS_LIST_FETCHING = "IS_FRIENDS_LIST_FETCHING"

const initialState = {
    users: [],
    usersCount: null,
    pageSize: 10,
    pageNumber: 1,
    portionSize: 10,
    portionNumber: 1,
    friends: [],
    term: "",
    isFollowInProcess: [],
    isFriendsListFetching: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_PAGE_NUMBER:
            return {...state, pageNumber: action.pageNumber}
        case SET_PORTION_NUMBER:
            return {...state, portionNumber: action.portionNumber}
        case SET_USERS_COUNT:
            return {...state, usersCount: action.usersCount}
        case SET_FRIENDS:
            return {...state, friends: action.friends}
        case SET_SEARCH_TERM:
            return {...state, term: action.term}
        case IS_FRIENDS_LIST_FETCHING:
            return {...state, isFriendsListFetching: action.isFriendsListFetching}
        case FOLLOW:
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    } else return user
                })
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    } else return user
                })
            }
        case SET_IS_FOLLOWING:
            return {
                ...state, isFollowInProcess: action.isFollowInProcess
                    ? [...state.isFollowInProcess, action.userId]
                    : state.isFollowInProcess.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber})
export const setPortionNumber = (portionNumber) => ({type: SET_PORTION_NUMBER, portionNumber})
export const setUsersCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount})
export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setIsFollowing = (isFollowInProcess, userId) => ({type: SET_IS_FOLLOWING, isFollowInProcess, userId})
export const setFriends = (friends) => ({type: SET_FRIENDS, friends})
export const setSearchTerm = (term) => ({type: SET_SEARCH_TERM, term})
export const setListFetching = (isFriendsListFetching) => ({type: IS_FRIENDS_LIST_FETCHING, isFriendsListFetching})

export const getUsers = (pageNumber = 1, pageSize, isFriend, term) => async (dispatch, getState) => {
    dispatch(setIsFetching(true))
    try {
        if (term) {
            dispatch(setSearchTerm(term))
        }
        let searchTerm = getState().users.term
        let response = await apiUsers.getUsers(pageNumber, pageSize, isFriend = false, searchTerm)
        dispatch(setUsers(response.items))
        dispatch(setUsersCount(response.totalCount))
    } catch (e) {
        dispatch(setErrorMessage("an error occurred while loading users"))
    }
    dispatch(setIsFetching(false))
}

export const getFriends = () => async (dispatch) => {
    try {
        dispatch(setListFetching(true))
        let response = await apiUsers.getUsers(1, 100, true, "")
        dispatch(setFriends(response.items))
    } catch (e) {
        dispatch(setErrorMessage("an error occurred while loading friends list"))
    } finally {
        dispatch(setListFetching(false))
    }
}

export const setFollow = (userId) => async (dispatch) => {
    dispatch(setIsFollowing(true, userId))
    let response = await apiUsers.follow(userId)
    if (response.resultCode === 0) {
        dispatch(follow(userId))
        dispatch(getFriends())
    } else {
        dispatch(setErrorMessage("an error occurred while following user"))
    }
    dispatch(setIsFollowing(false, userId))
}

export const setUnfollow = (userId) => async (dispatch) => {
    dispatch(setIsFollowing(true, userId))
    let response = await apiUsers.unfollow(userId)
    if (response.resultCode === 0) {
        dispatch(unfollow(userId))
        dispatch(getFriends())
    } else {
        dispatch(setErrorMessage("an error occurred while unfollowing user"))
    }
    dispatch(setIsFollowing(false, userId))
}

export default usersReducer