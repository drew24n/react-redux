import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {Container} from "./app-style";
import {initializeApp, setIsFetching} from "../../redux/app-reducer";
import Header from "../header/header";
import IncorrectUrl from "../incorrect-url/incorrect-url";
import Login from "../login/login";
import Home from "../home/home";
import Footer from "../footer/footer";
import Preloader from "../common/preloader/preloader";
import {withSuspense} from "../../hoc/with-suspense";
const UsersContainer = React.lazy(() => import(`../users/users-container`));
const ProfileContainer = React.lazy(() => import(`../profile/profile-container`));

const App = (props) => {
    const catchAllUnhandledErrors = (reason) => {
        alert(reason.reason.message);
        props.setIsFetching(false)
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
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header/>
                <Switch>
                    {/*<Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>*/}
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/profile/:userId?"} render={withSuspense(ProfileContainer)}/>
                    <Route path={"/users"} render={withSuspense(UsersContainer)}/>
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
    setIsFetching: (isFetching) => dispatch(setIsFetching(isFetching))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);