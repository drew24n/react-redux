let initialState = {
    data: {},
    isFetching: false,
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH-DATA": return {...state, data: action.authData};
        case "IS-FETCHING": return {...state, isFetching: action.isFetching};
        default: return state;
    }
};

export const setAuthData = (authData) => ({type: "AUTH-DATA", authData});
export const setIsFetching = (isFetching) => ({type: "IS-FETCHING", isFetching});

export default authReducer;