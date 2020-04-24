import {authMe} from "./auth-reducer";

const SET_IS_INITIALIZED = "SET_INITIALIZED";
export const SET_IS_FETCHING = "SET_IS_FETCHING";

const initialState = {
    isInitialized: false,
    isFetching: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized};
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state
    }
};

const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

// export const initializeApp = () => (dispatch) => {
//     let promise = dispatch(authMe());
//     Promise.all([promise]).then(() => {
//             dispatch(setIsInitialized(true))
//         })
// };

export const initializeApp = () => async (dispatch) => {
    await dispatch(authMe());
    dispatch(setIsInitialized(true))
};

export default appReducer;