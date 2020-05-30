import {SubmissionError} from "redux-form"
import {setErrorMessage, setIsFetching} from "./app-reducer"
import {apiAuth} from "../api/api-auth";
import {apiSecurity} from "../api/api-security";

const SET_AUTH_DATA = "SET_AUTH_DATA"
const SET_CAPTCHA = "SET_CAPTCHA"

const initialState = {
    id: null,
    login: null,
    email: null,
    rememberMe: null,
    captcha: null,
    isAuthorized: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {...state, ...action.payload, isAuthorized: action.isAuthorized}
        case SET_CAPTCHA:
            return {...state, captcha: action.captcha}
        default:
            return state
    }
}

export const setAuthData = ({id, login, email}, isAuthorized) => ({
    type: SET_AUTH_DATA,
    payload: {id, login, email},
    isAuthorized
})
export const setCaptcha = (captcha) => ({type: SET_CAPTCHA, captcha})

export const authMe = () => async (dispatch) => {
    let response = await apiAuth.me()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthData({id, email, login}, true))
    } else if (response.resultCode === 1) {
        // console.log("not authorized")
    } else {
        dispatch(setErrorMessage("an error occurred during user identification"))
    }
}

export const login = ({email, password, rememberMe, captcha}) => async (dispatch) => {
    dispatch(setIsFetching(true))
    let response = await apiAuth.login({email, password, rememberMe, captcha})
    if (response.resultCode === 0) {
        await dispatch(authMe())
        dispatch(setCaptcha(null))
    } else if (response.resultCode === 10) {
        let captcha = await apiSecurity.getCaptcha()
        dispatch(setCaptcha(captcha))
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : "unknown error occurred"
        throw new SubmissionError({_error: message})
    }
    dispatch(setIsFetching(false))
}

export const logout = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    let response = await apiAuth.logout()
    if (response.resultCode === 0) {
        dispatch(setAuthData({id: null, email: null, login: null}, false))
        dispatch(setCaptcha(null))
    } else {
        dispatch(setErrorMessage("an error occurred during logout"))
    }
    dispatch(setIsFetching(false))
}

export default authReducer