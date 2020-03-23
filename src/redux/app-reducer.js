import {authMe} from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
    isInitialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: return {...state, isInitialized: true};
        default: return state;
    }
};

export const initializeSuccess = () => ({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(authMe());
    Promise.all([promise]).then(() => {
            dispatch(initializeSuccess())
        })
};

export default appReducer;