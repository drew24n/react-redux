import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import settingsReducer from "./settings-reducer";
import appReducer from "./app-reducer";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
        profile: profileReducer,
        messages: messagesReducer,
        usersPage: usersReducer,
        auth: authReducer,
        settings: settingsReducer,
        app: appReducer,
        form: formReducer,
    }
);

let store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;

window.store = store;