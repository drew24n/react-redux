import React from "react";
import style from "./login_page.module.css"
import {Field, reduxForm} from "redux-form";
import {CustomInput} from "../common/CustomForms/CustomForm";
import {maxLenght, required} from "../../validators/validators";

const maxLenght10 = maxLenght(10);

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
            <div><Field name={"login"} component={CustomInput} validate={[required, maxLenght10]} placeholder={"login"}/></div>
            <div><Field name={"password"} component={CustomInput} validate={[required, maxLenght10]} type={"password"} placeholder={"password"}/></div>
            <div><Field name={"rememberMe"} component={"input"} type={"checkbox"}/>Remember me</div>
            <div><button>Enter</button></div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: "authorization"
})(LoginForm);

export default LoginPage;

let showAuthData = (values) => {
    console.log(values);
    alert("Auth");
};