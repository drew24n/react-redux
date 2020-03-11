import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthData, setIsFetching} from "../../redux/auth-reducer";
import Preloader from "../common/Preloader/Preloader";
import {API} from "../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        API.me().then(response => {
            this.props.setAuthData(response);
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