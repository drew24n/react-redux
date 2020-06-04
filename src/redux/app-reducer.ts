import {authMe} from "./auth-reducer"
import {stateType} from "./redux-store"
import {ThunkAction} from "redux-thunk"

const SET_IS_INITIALIZED = "SET_INITIALIZED"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
export const SET_IS_FETCHING = "SET_IS_FETCHING"

type setInitializedType = {
    type: typeof SET_IS_INITIALIZED
    isInitialized: boolean
}

export type setErrorMessageType = {
    type: typeof SET_ERROR_MESSAGE
    error: string
}

export type setIsFetchingType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

type actionsType = setInitializedType | setErrorMessageType | setIsFetchingType

type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>

const initialState = {
    isInitialized: false,
    isFetching: false,
    error: null as string | null
}

const appReducer = (state = initialState, action: actionsType): typeof initialState=> {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_ERROR_MESSAGE:
            return {...state, error: action.error}
        default:
            return state
    }
}

const setIsInitialized = (isInitialized: boolean): setInitializedType => ({type: SET_IS_INITIALIZED, isInitialized})
export const setErrorMessage = (error: string): setErrorMessageType => ({type: SET_ERROR_MESSAGE, error})
export const setIsFetching = (isFetching: boolean): setIsFetchingType => ({type: SET_IS_FETCHING, isFetching})

export const initializeApp = (): thunkActionType => async (dispatch) => {
    try {
        await dispatch(authMe())
        dispatch(setIsInitialized(true))
    } catch (e) {
        dispatch(setErrorMessage("an error occurred during app initialization"))
    }
}

// export const initializeApp = () => (dispatch) => {
//     let promise = dispatch(authMe())
//     Promise.all([promise]).then(() => {
//             dispatch(setIsInitialized(true))
//         })
// }

export default appReducer