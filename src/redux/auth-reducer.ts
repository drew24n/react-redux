import {SubmissionError} from "redux-form"
import {setErrorMessage, setErrorMessageType, setIsFetching, setIsFetchingType} from "./app-reducer"
import {apiAuth} from "../api/api-auth"
import {apiSecurity} from "../api/api-security"
import {ThunkAction} from "redux-thunk"
import {stateType} from "./redux-store"

const SET_AUTH_DATA = "SET_AUTH_DATA"
const SET_CAPTCHA = "SET_CAPTCHA"

type setAuthDataType<T = {}> = {
    type: typeof SET_AUTH_DATA
    payload: T
    isAuthorized: boolean
}

type authPayloadType = {
    id: number | null
    login: string | null
    email: string | null
}

type setCaptchaType = {
    type: typeof SET_CAPTCHA
    captcha: string | null
}

type loginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type actionsType = setAuthDataType<authPayloadType> | setCaptchaType | setErrorMessageType | setIsFetchingType

type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    rememberMe: false,
    captcha: null as string | null,
    isAuthorized: false
}

const authReducer = (state = initialState, action: actionsType): typeof initialState=> {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {...state, ...action.payload, isAuthorized: action.isAuthorized}
        case SET_CAPTCHA:
            return {...state, captcha: action.captcha}
        default:
            return state
    }
}

export const setAuthData = ({id, login, email}: authPayloadType, isAuthorized: boolean): actionsType => ({
    type: SET_AUTH_DATA,
    payload: {id, login, email},
    isAuthorized
})

export const setCaptcha = (captcha: string | null): actionsType => ({type: SET_CAPTCHA, captcha})

export const authMe = (): thunkActionType => async (dispatch) => {
    let response = await apiAuth.me()
    if (response.resultCode === 0) {
        // let {id, email, login} = response.data
        dispatch(setAuthData(response.data, true))
    } else if (response.resultCode === 1) {
        // console.log("not authorized")
    } else {
        dispatch(setErrorMessage("an error occurred during user identification"))
    }
}

export const login = ({email, password, rememberMe, captcha}: loginPayloadType): thunkActionType => async (dispatch) => {
    dispatch(setIsFetching(true))
    let response = await apiAuth.login({email, password, rememberMe, captcha})
    if (response.resultCode === 0) {
        await dispatch(authMe())
        dispatch(setCaptcha(null))
    } else if (response.resultCode === 10) {
        let captcha = await apiSecurity.getCaptcha()
        dispatch(setCaptcha(captcha))
    } else {
        dispatch(setIsFetching(false))
        let message = response.messages.length > 0 ? response.messages[0] : "unknown error occurred"
        throw new SubmissionError({_error: message})
    }
    dispatch(setIsFetching(false))
}

export const logout = (): thunkActionType => async (dispatch) => {
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
