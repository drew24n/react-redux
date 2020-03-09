import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
        profile: profileReducer,
        messages: messagesReducer,
        usersPage: usersReducer,
    }
);

let store = createStore(reducers);

export default store;

window.store = store;