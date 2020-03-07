let initialState = {
    users: [],
    users_amount: 0,
    page_size: 5,
    current_page: 1,
    isFetching: false,
};

let users_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-FRIEND":
            return {...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return ({...u, followed: true})
                    }
                    return u;
                })
            };
        case "REMOVE-FRIEND":
            return {...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return ({...u, followed: false})
                    }
                    return u;
                })
            };

        case "GET-USERS": return {...state, users: [/*...state.users,*/...action.users]};
        case "GET-USERS-AMOUNT": return {...state, users_amount: action.usersAmount};
        case "CURRENT-PAGE": return {...state, current_page: action.pageNumber};
        case "IS-FETCHING": return {...state, isFetching: action.isFetching};
        default: return state
    }
};

export let followAC = (userId) => ({type: "ADD-FRIEND", userId});
export let unfollowAC = (userId) => ({type: "REMOVE-FRIEND", userId});
export let setUsersAC = (users) => ({type: "GET-USERS", users});
export let setCurrentPageAC = (pageNumber) => ({type: "CURRENT-PAGE", pageNumber});
export let setUsersAmountAC = (usersAmount) => ({type: "GET-USERS-AMOUNT", usersAmount});
export let setIsFetchingAC = (isFetching) => ({type: "IS-FETCHING", isFetching});

export default users_reducer;