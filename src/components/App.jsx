import React from "react";
import {Route} from "react-router-dom";
import style from "./app.module.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import Settings from "./Settings/Settings";
import MessagesContainer from "./Messages/MessagesContainer";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import Login from "./LoginPage/LoginPage";
import {connect} from "react-redux";
import {initializeApp} from "../redux/app-reducer";

class App extends React.Component {
    componentDidMount() {this.props.initialize()}

    render() {
        if (!this.props.isInitialized) {return null}
        return (
                <div className={style.container}>
                    <HeaderContainer/>
                    <Footer/>
                    <NavBar/>
                    <div className={style.content}>
                        <Route path="/profile/:usersId?" render={() => <ProfileContainer/>}/>
                        <Route path="/messages" render={() => <MessagesContainer/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                    </div>
                </div>
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