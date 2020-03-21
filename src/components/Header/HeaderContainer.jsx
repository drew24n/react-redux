import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authMe, Logout} from "../../redux/auth-reducer";
import Preloader from "../common/Preloader/Preloader";

class HeaderContainer extends React.Component {
    componentDidMount() {this.props.auth()}

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Header {...this.props}/>
        </>
    }
}

let mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
});

let mapDispatchToProps = (dispatch) => ({
    auth: () => dispatch(authMe()),
    Logout: () => dispatch(Logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);