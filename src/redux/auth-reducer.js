import {API} from "../components/api/api";

const AUTH_DATA = "AUTH_DATA";
const IS_FETCHING = "IS_FETCHING";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DATA: return {...state, ...action.data, isAuth: true};
        case IS_FETCHING: return {...state, isFetching: action.isFetching};
        default: return state;
    }
};

export const setAuthData = (id, email, login) => ({type: AUTH_DATA, data: {id, email, login}});
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching});

export const authMe = () => (dispatch) => {
    dispatch(setIsFetching(true));
    API.me().then(response => {
        if(response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(setAuthData(id, email, login));
        }
        dispatch(setIsFetching(false));
    })
};

export default authReducer;