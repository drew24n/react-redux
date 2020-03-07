import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import Weather from "./Weather/Weather";
import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";
import MessagesContainer from "./Messages/MessagesContainer";
import UsersContainer from "./Users/UsersContainer";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app_wrapper">
                <Header/>
                <Footer/>
                <NavBar/>
                <div className="app_content">
                    <Route exact path="/(|/|profile|)/" render={() => <Profile/>}/>
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