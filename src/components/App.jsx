import React, {lazy} from "react";
import {BrowserRouter, Route} from "react-router-dom";
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
const UsersContainer = lazy(() => import("./Users/UsersContainer"));

class App extends React.Component {
    componentDidMount() {this.props.initialize()}

    render() {
        if (!this.props.isInitialized) {return null}
        return (
            <BrowserRouter>
                <div className={style.container}>
                    <HeaderContainer/>
                    <Footer/>
                    <NavBar/>
                    <div className={style.content}>
                        <Route path="/profile/:usersId?" render={() => <ProfileContainer/>}/>
                        <Route path="/messages" render={() => <MessagesContainer/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                        <Route path="/users" render={withLazyLoading(UsersContainer)}/>
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