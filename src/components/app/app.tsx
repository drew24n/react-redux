import React, {FC, useEffect} from "react"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import {connect} from "react-redux"
import "bootstrap/dist/css/bootstrap.css"
import {Container} from "./app-style"
import {initializeApp, setErrorMessage, setIsFetching} from "../../redux/app-reducer"
import Header from "../header/header"
import IncorrectUrl from "../incorrect-url/incorrect-url"
import Login from "../login/login"
import Footer from "../footer/footer"
import Preloader from "../common/preloader/preloader"
import Error from "../common/error-modal/error-modal"
import ProfileContainer from "../profile/profile-container"
import UsersContainer from "../users/users-container"
import {stateType} from "../../redux/redux-store"
import {ThunkDispatch} from "redux-thunk"
import {Action} from "redux"

// const UsersContainer = React.lazy(() => import(`../users/users-container`))
// const ProfileContainer = React.lazy(() => import(`../profile/profile-container`))

type mapStateToPropsType = {
    isInitialized: boolean
    error: string | null
}

type mapDispatchToPropsType = {
    initializeApp: () => void
    setIsFetching: (isFetching: boolean) => void,
    setErrorMessage: (error: string) => void
}

export type propsType = mapStateToPropsType & mapDispatchToPropsType

const App: FC<propsType> = (props) => {
    const catchAllUnhandledErrors = (reason: PromiseRejectionEvent) => {
        props.setIsFetching(false)
        props.setErrorMessage(reason.reason.message)
    }

    useEffect(() => {
        if (!props.isInitialized) {
            props.initializeApp()
        }
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    })

    if (!props.isInitialized) return <Preloader/>

    return (
        <Container>
            {props.error !== null && <Error/>}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header/>
                <Switch>
                    <Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    {/*<Route path={"/profile/:userId?"} render={withSuspense(ProfileContainer)}/>*/}
                    {/*<Route path={"/users"} render={withSuspense(UsersContainer)}/>*/}
                    {/*<Route exact path={"/"} render={() => <Home/>}/>*/}
                    <Route render={() => <IncorrectUrl/>}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        </Container>
    )
}

const mapStateToProps = (state: stateType) => ({
    isInitialized: state.app.isInitialized,
    error: state.app.error
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateType, undefined, Action>): mapDispatchToPropsType => ({
    initializeApp: () => dispatch(initializeApp()),
    setIsFetching: (isFetching) => dispatch(setIsFetching(isFetching)),
    setErrorMessage: (error) => dispatch(setErrorMessage(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
