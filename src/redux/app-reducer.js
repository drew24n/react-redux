import {authMe} from "./auth-reducer";

const SET_IS_INITIALIZED = "SET_INITIALIZED";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_IS_FETCHING = "SET_IS_FETCHING";

const initialState = {
    isInitialized: false,
    isFetching: false,
    error: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized};
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_ERROR_MESSAGE:
            return {...state, error: action.error};
        default:
            return state
    }
};

const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized});
export const setErrorMessage = (error) => ({type: SET_ERROR_MESSAGE, error});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

export const initializeApp = () => async (dispatch) => {
    try {
        await dispatch(authMe());
        dispatch(setIsInitialized(true))
    } catch (e) {
        dispatch(setErrorMessage("an error occurred during app initialization"))
    }
};

// export const initializeApp = () => (dispatch) => {
//     let promise = dispatch(authMe());
//     Promise.all([promise]).then(() => {
//             dispatch(setIsInitialized(true))
//         })
// };

export default appReducer;