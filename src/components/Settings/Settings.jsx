import React from "react";
import style from "./settings.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({isAuth: state.auth.isAuth});

const Settings = () => {
    return (
        <div className={style.container}>
            <h3>Settings</h3>
        </div>
    )
};

export default compose(
    connect(mapStateToProps),
    withAuthRedirect
)(Settings);