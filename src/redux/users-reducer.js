import {apiUsers} from "../api/api";
import {setErrorMessage, setIsFetching} from "./app-reducer";

const SET_USERS = "SET_USERS";
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
const SET_PORTION_NUMBER = "SET_PORTION_NUMBER";
const SET_USERS_COUNT = "SET_USERS_COUNT";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_IS_FOLLOWING = "SET_IS_FOLLOWING";

const initialState = {
    users: [],
    usersCount: null,
    pageSize: 10,
    pageNumber: 1,
    portionSize: 10,
    portionNumber: 1,
    isFollowInProcess: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: [...action.users]};
        case SET_PAGE_NUMBER:
            return {...state, pageNumber: action.pageNumber};
        case SET_PORTION_NUMBER:
            return {...state, portionNumber: action.portionNumber};
        case SET_USERS_COUNT:
            return {...state, usersCount: action.usersCount};
        case FOLLOW:
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    } else return user
                })
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    } else return user
                })
            };
        case SET_IS_FOLLOWING:
            return {
                ...state, isFollowInProcess: action.isFollowInProcess
                    ? [...state.isFollowInProcess, action.userId]
                    : state.isFollowInProcess.filter(id => id !== action.userId)
            };
        default:
            return state
    }
};

export const setUsers = (users) => ({type: SET_USERS, users});
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber});
export const setPortionNumber = (portionNumber) => ({type: SET_PORTION_NUMBER, portionNumber});
export const setUsersCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount});
export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setIsFollowing = (isFollowInProcess, userId) => ({type: SET_IS_FOLLOWING, isFollowInProcess, userId});

export const getUsers = (pageNumber, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
        let response = await apiUsers.getUsers(pageNumber, pageSize);
        dispatch(setUsers(response.items));
        dispatch(setUsersCount(response.totalCount))
    } catch (e) {
        dispatch(setErrorMessage("an error occurred while loading users"))
    }
    dispatch(setIsFetching(false))
};

export const getPageNumber = (pageNumber) => (dispatch) => {
    dispatch(setPageNumber(pageNumber))
};

export const setFollow = (userId) => async (dispatch) => {
    dispatch(setIsFollowing(true, userId));
    let response = await apiUsers.follow(userId);
    if (response.resultCode === 0) {
        dispatch(follow(userId))
    } else {
        dispatch(setErrorMessage("an error occurred while following user"))
    }
    dispatch(setIsFollowing(false, userId))
};

export const setUnfollow = (userId) => async (dispatch) => {
    dispatch(setIsFollowing(true, userId));
    let response = await apiUsers.unfollow(userId);
    if (response.resultCode === 0) {
        dispatch(unfollow(userId))
    } else {
        dispatch(setErrorMessage("an error occurred while unfollowing user"))
    }
    dispatch(setIsFollowing(false, userId))
};

export default usersReducer;