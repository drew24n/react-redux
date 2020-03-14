import {API} from "../components/api/api";

const AUTH_DATA = "AUTH_DATA";
const IS_FETCHING = "IS_FETCHING";

let initialState = {
    data: {},
    isFetching: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DATA: return {...state, data: action.data};
        case IS_FETCHING: return {...state, isFetching: action.isFetching};
        default: return state;
    }
};

export const setAuthData = (data) => ({type: AUTH_DATA, data});
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching});

export const authMe = () => (dispatch) => {
    dispatch(setIsFetching(true));
    API.me().then(response => {
        dispatch(setAuthData(response));
        dispatch(setIsFetching(false));
    })
};

export default authReducer;