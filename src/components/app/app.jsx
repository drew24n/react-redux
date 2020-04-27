import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import {Container} from "./app-style";
import {initializeApp, setErrorMessage, setIsFetching} from "../../redux/app-reducer";
import Header from "../header/header";
import IncorrectUrl from "../incorrect-url/incorrect-url";
import Login from "../login/login";
import Home from "../home/home";
import Footer from "../footer/footer";
import Preloader from "../common/preloader/preloader";
import Error from "../common/error-modal/error-modal";
import ProfileContainer from "../profile/profile-container";
import UsersContainer from "../users/users-container";

// const UsersContainer = React.lazy(() => import(`../users/users-container`));
// const ProfileContainer = React.lazy(() => import(`../profile/profile-container`));

const App = (props) => {
    const catchAllUnhandledErrors = (reason) => {
        props.setIsFetching(false);
        props.setErrorMessage(reason.reason.message)
    };

    useEffect(() => {
        if (props.isInitialized === false) {
            props.initializeApp()
        }
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    });

    if (props.isInitialized === false) return <Preloader/>;

    return (
        <Container>
            {props.error !== null && <Error/>}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header/>
                <Switch>
                    {/*<Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>*/}
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    {/*<Route path={"/profile/:userId?"} render={withSuspense(ProfileContainer)}/>*/}
                    {/*<Route path={"/users"} render={withSuspense(UsersContainer)}/>*/}
                    <Route exact path={"/"} render={() => <Home/>}/>
                    <Route render={() => <IncorrectUrl/>}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
});

const mapDispatchToProps = (dispatch) => ({
    initializeApp: (isInitialized) => dispatch(initializeApp(isInitialized)),
    setIsFetching: (isFetching) => dispatch(setIsFetching(isFetching)),
    setErrorMessage: (error) => dispatch(setErrorMessage(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);