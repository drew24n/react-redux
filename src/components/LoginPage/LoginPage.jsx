import React from "react";
import style from "./login_page.module.css"
import {Field, reduxForm} from "redux-form";
import {CustomInput} from "../common/CustomForms/CustomForm";
import {email, maxLenght, required} from "../../validators/validators";
import {connect} from "react-redux";
import {Login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const maxLenght25 = maxLenght(25);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={"email"} component={CustomInput} validate={[required, email, maxLenght25]} placeholder={"email"}/></div>
            <div><Field name={"password"} component={CustomInput} validate={[required, maxLenght25]} type={"password"} placeholder={"password"}/></div>
            <div className={style.common_error}>{props.error}</div>
            <div><Field name={"rememberMe"} component={"input"} type={"checkbox"}/>Remember me</div>
            <div><button>Enter</button></div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: "authorization"
})(LoginForm);

const LoginPage = (props) => {

    let userLogin = (value) => props.Login(value);

    if (props.isAuth) return <Redirect to={"/profile"}/>;

    return (
        <div className={style.container}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={userLogin}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {Login})(LoginPage);