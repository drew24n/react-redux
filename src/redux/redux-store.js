import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunk from "redux-thunk"
import authReducer from "./auth-reducer"
import appReducer from "./app-reducer"
import usersReducer from "./users-reducer"
import profileReducer from "./profile-reducer"
import {reducer as formReducer} from "redux-form"
import {composeWithDevTools} from 'redux-devtools-extension'

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
    profile: profileReducer,
    form: formReducer
})

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))

export default store