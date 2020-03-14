import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authMe} from "../../redux/auth-reducer";
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
    data: state.auth.data,
    isFetching: state.auth.isFetching,
});

let mapDispatchToProps = (dispatch) => ({
    auth: () => dispatch(authMe())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);