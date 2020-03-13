const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const GET_USERS_AMOUNT = "GET_USERS_AMOUNT";
const CURRENT_PAGE = "CURRENT_PAGE";
const IS_FETCHING = "IS_FETCHING";
const FOLLOW_IN_PROCESS = "FOLLOW_IN_PROCESS";

let initialState = {
    users: [],
    usersAmount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    isFollowInProcess: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: return {
            ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return ({...u, followed: true})
                    }
                    return u;
                })
            };
        case UNFOLLOW: return {
            ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return ({...u, followed: false})
                    }
                    return u;
                })
            };
        case GET_USERS: return {...state, users: [/*...state.users,*/...action.users]};
        case GET_USERS_AMOUNT: return {...state, usersAmount: action.usersAmount};
        case CURRENT_PAGE: return {...state, currentPage: action.currentPage};
        case IS_FETCHING: return {...state, isFetching: action.isFetching};
        case FOLLOW_IN_PROCESS: return {...state, isFollowInProcess: action.isInProcess
                ? [...state.isFollowInProcess, action.userId]
                : state.isFollowInProcess.filter(id => id !== action.userId)
        };
        default: return state
    }
};

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: GET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: CURRENT_PAGE, currentPage});
export const setUsersAmountAC = (usersAmount) => ({type: GET_USERS_AMOUNT, usersAmount});
export const setIsFetchingAC = (isFetching) => ({type: IS_FETCHING, isFetching});
export const isFollowProcessAC = (isInProcess, userId) => ({type: FOLLOW_IN_PROCESS, isInProcess, userId});

export default usersReducer;