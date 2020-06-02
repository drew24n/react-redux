import React from "react"
import ReactDOM from "react-dom"
import store from "./redux/redux-store"
import {Provider} from "react-redux"
import "bootstrap/dist/css/bootstrap.css"
import App from "./components/app/app"
import * as serviceWorker from "./service-worker"

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("root")
)

serviceWorker.register()