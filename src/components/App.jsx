import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import style from "./app.module.css";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import Weather from "./Weather/Weather";
import Settings from "./Settings/Settings";
import MessagesContainer from "./Messages/MessagesContainer";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";

const App = () => {
    return (
        <BrowserRouter>
            <div className={style.container}>
                <HeaderContainer/>
                <Footer/>
                <NavBar/>
                <div className={style.content}>
                    <Route path="/profile/:usersId?" render={() => <ProfileContainer/>}/>
                    <Route path="/messages" render={() => <MessagesContainer/>}/>
                    <Route path="/weather" render={() => <Weather/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default App;