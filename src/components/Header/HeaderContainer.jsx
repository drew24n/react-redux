import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthData, setIsFetching} from "../../redux/auth-reducer";
import Preloader from "../common/Preloader/Preloader";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
            this.props.setAuthData(response.data);
            this.props.setIsFetching(false);
        })
    }

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Header {...this.props}/>
        </>
    }
}

let mapStateToProps = (state) => ({
    data: state.auth.data,
    isFetching: state.auth.isFetching,
});

export default connect(mapStateToProps, {setAuthData, setIsFetching})(HeaderContainer);