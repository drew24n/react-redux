import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import settingsReducer from "./settings-reducer";

let reducers = combineReducers({
        profile: profileReducer,
        messages: messagesReducer,
        usersPage: usersReducer,
        auth: authReducer,
        settings: settingsReducer
    }
);

let store = createStore(reducers, applyMiddleware(thunk));

export default store;

window.store = store;