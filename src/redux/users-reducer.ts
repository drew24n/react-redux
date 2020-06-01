import {setErrorMessage, setErrorMessageType, setIsFetching, setIsFetchingType} from "./app-reducer"
import {apiUsers, userItem} from "../api/api-users"
import {ThunkAction} from "redux-thunk"
import {stateType} from "./redux-store"

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

type setUsers = {
    type: typeof SET_USERS
    users: Array<userItem>
}

type setPageNumber = {
    type: typeof SET_PAGE_NUMBER
    pageNumber: number
}

type setPortionNumber = {
    type: typeof SET_PORTION_NUMBER
    portionNumber: number
}

type setUsersCount = {
    type: typeof SET_USERS_COUNT
    usersCount: number
}

type follow = {
    type: typeof FOLLOW
    userId: number
}
type unfollow = {
    type: typeof UNFOLLOW
    userId: number
}

type setIsFollowing = {
    type: typeof SET_IS_FOLLOWING
    isFollowInProcess: boolean
    userId: number
}

type setFriends = {
    type: typeof SET_FRIENDS
    friends: Array<userItem>
}

type setSearchTerm = {
    type: typeof SET_SEARCH_TERM
    term: string
}

type setListFetching = {
    type: typeof IS_FRIENDS_LIST_FETCHING
    isFriendsListFetching: boolean
}

type actionsType = setUsers | setPageNumber | setPortionNumber | setUsersCount | follow | unfollow | setIsFollowing |
    setFriends | setSearchTerm | setListFetching | setIsFetchingType | setErrorMessageType

type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>

const initialState = {
    users: [] as Array<userItem>,
    usersCount: 0 as number,
    pageSize: 10 as number,
    pageNumber: 1 as number,
    portionSize: 10 as number,
    portionNumber: 1 as number,
    friends: [] as Array<userItem>,
    term: "" as string,
    isFollowInProcess: [] as Array<boolean | number>,
    isFriendsListFetching: false
}

const usersReducer = (state = initialState, action: actionsType): typeof initialState => {
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

export const setUsers = (users: Array<userItem>): setUsers => ({type: SET_USERS, users})
export const setPageNumber = (pageNumber: number): setPageNumber => ({type: SET_PAGE_NUMBER, pageNumber})
export const setPortionNumber = (portionNumber: number): setPortionNumber => ({type: SET_PORTION_NUMBER, portionNumber})
export const setUsersCount = (usersCount: number): setUsersCount => ({type: SET_USERS_COUNT, usersCount})
export const follow = (userId: number): follow => ({type: FOLLOW, userId})
export const unfollow = (userId: number): unfollow => ({type: UNFOLLOW, userId})
export const setIsFollowing = (isFollowInProcess: boolean, userId: number): setIsFollowing => ({
    type: SET_IS_FOLLOWING, isFollowInProcess, userId
})
export const setFriends = (friends: Array<userItem>): setFriends => ({type: SET_FRIENDS, friends})
export const setSearchTerm = (term: string): setSearchTerm => ({type: SET_SEARCH_TERM, term})
export const setListFetching = (isFriendsListFetching: boolean): setListFetching => ({
    type: IS_FRIENDS_LIST_FETCHING, isFriendsListFetching
})

export const getUsers = (pageNumber = 1, pageSize: number, isFriend: boolean, term: string): thunkActionType => async (dispatch, getState) => {
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

export const getFriends = (): thunkActionType => async (dispatch) => {
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

export const setFollow = (userId: number): thunkActionType => async (dispatch) => {
    dispatch(setIsFollowing(true, userId))
    let response = await apiUsers.follow(userId)
    if (response.resultCode === 0) {
        dispatch(follow(userId))
        await dispatch(getFriends())
    } else {
        dispatch(setErrorMessage("an error occurred while following user"))
    }
    dispatch(setIsFollowing(false, userId))
}

export const setUnfollow = (userId: number): thunkActionType => async (dispatch) => {
    dispatch(setIsFollowing(true, userId))
    let response = await apiUsers.unfollow(userId)
    if (response.resultCode === 0) {
        dispatch(unfollow(userId))
        await dispatch(getFriends())
    } else {
        dispatch(setErrorMessage("an error occurred while unfollowing user"))
    }
    dispatch(setIsFollowing(false, userId))
}

export default usersReducer