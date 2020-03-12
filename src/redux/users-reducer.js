const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const GET_USERS_AMOUNT = "GET_USERS_AMOUNT";
const CURRENT_PAGE = "CURRENT_PAGE";
const IS_FETCHING = "IS_FETCHING";

let initialState = {
    users: [],
    usersAmount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
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
        default: return state
    }
};

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: GET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: CURRENT_PAGE, currentPage});
export const setUsersAmountAC = (usersAmount) => ({type: GET_USERS_AMOUNT, usersAmount});
export const setIsFetchingAC = (isFetching) => ({type: IS_FETCHING, isFetching});

export default usersReducer;