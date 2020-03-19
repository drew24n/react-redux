import React from "react";
import style from "./login_page.module.css"
import {Field, reduxForm} from "redux-form";

const LoginPage = () => {
    return (
        <div className={style.container}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={showAuthData}/>
        </div>
    )
};

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={"login"} component={"input"} placeholder={"login"}/></div>
            <div><Field name={"password"} component={"input"} type={"password"} placeholder={"password"}/></div>
            <div><Field name={"rememberMe"} component={"input"} type={"checkbox"}/>Remember me</div>
            <div>
                <button>Enter</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: "authorization"
})(LoginForm);

export default LoginPage;

let showAuthData = (values) => {
    console.log(values)
};