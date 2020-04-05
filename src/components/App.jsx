import React, {lazy} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import style from "./app.module.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import Settings from "./Settings/Settings";
import MessagesContainer from "./Messages/MessagesContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import Login from "./LoginPage/LoginPage";
import {connect} from "react-redux";
import {initializeApp} from "../redux/app-reducer";
import {withLazyLoading} from "./hoc/withLazyLoading";
import classNames from "classnames";
const UsersContainer = lazy(() => import("./Users/UsersContainer"));

class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert("Some error occurred")
    };

    componentDidMount() {
        this.props.initialize();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        this.props.initialize();
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.isInitialized) {return null}
        return (
            <BrowserRouter>
                <div className={classNames(style.container, style.global)}>
                    <HeaderContainer/>
                    <Footer/>
                    <NavBar/>
                    <div className={style.content}>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/profile/:usersId?" render={() => <ProfileContainer/>}/>
                            <Route path="/messages" render={() => <MessagesContainer/>}/>
                            <Route path="/settings" render={() => <Settings/>}/>
                            <Route path="/login" render={() => <Login/>}/>
                            <Route path="/users" render={withLazyLoading(UsersContainer)}/>
                            <Route render={() => <div>404 Not Found</div>}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    initialize: () => dispatch(initializeApp())
});

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
});

export default connect(mapStateToProps, mapDispatchToProps)(App);