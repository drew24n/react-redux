import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {Logout} from "../../redux/auth-reducer";
import Preloader from "../common/Preloader/Preloader";

function HeaderContainer(props) {
    return <>
        {props.isFetching === true ? <Preloader/> : null}
        <Header {...props}/>
    </>
}

let mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
});

let mapDispatchToProps = (dispatch) => ({
    Logout: () => dispatch(Logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);