import {combineReducers, createStore} from "redux";
import profile_reducer from "./profile_reducer";
import messages_reducer from "./messages_reducer";
import users_reducer from "./users_reducer";

let reducers = combineReducers({
        profile: profile_reducer,
        messages: messages_reducer,
        usersPage: users_reducer,
    }
);

let store = createStore(reducers);

export default store;

window.store = store;