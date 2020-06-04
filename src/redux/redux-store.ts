import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunk from "redux-thunk"
import authReducer from "./auth-reducer"
import appReducer from "./app-reducer"
import usersReducer from "./users-reducer"
import profileReducer from "./profile-reducer"
import {reducer as formReducer} from "redux-form"
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
    profile: profileReducer,
    form: formReducer
})

type rootReducerType = typeof rootReducer
export type stateType = ReturnType<rootReducerType>

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : (f: () => void) => f
))

export default store