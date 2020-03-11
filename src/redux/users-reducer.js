let initialState = {
    users: [],
    usersAmount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
};

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FOLLOW": return {
            ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return ({...u, followed: true})
                    }
                    return u;
                })
            };
        case "UNFOLLOW": return {
            ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return ({...u, followed: false})
                    }
                    return u;
                })
            };
        case "GET-USERS": return {...state, users: [/*...state.users,*/...action.users]};
        case "GET-USERS-AMOUNT": return {...state, usersAmount: action.usersAmount};
        case "CURRENT-PAGE": return {...state, currentPage: action.pageNumber};
        case "IS-FETCHING": return {...state, isFetching: action.isFetching};
        default: return state
    }
};

export const follow = (userId) => ({type: "FOLLOW", userId});
export const unfollow = (userId) => ({type: "UNFOLLOW", userId});
export const setUsers = (users) => ({type: "GET-USERS", users});
export const setCurrentPage = (pageNumber) => ({type: "CURRENT-PAGE", pageNumber});
export const setUsersAmount = (usersAmount) => ({type: "GET-USERS-AMOUNT", usersAmount});
export const setIsFetching = (isFetching) => ({type: "IS-FETCHING", isFetching});

export default usersReducer;