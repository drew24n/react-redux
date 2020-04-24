import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import usersReducer from "./users-reducer";
import profileReducer from "./profile-reducer";
import {reducer as formReducer} from "redux-form";

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
    profile: profileReducer,
    form: formReducer
});

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

window.store = store;

export default store;