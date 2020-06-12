import React, {FC} from "react"
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {Button, Form} from "react-bootstrap"
import {Input} from "../common/forms/input"
import {login, loginPayloadType} from "../../redux/auth-reducer"
import {Container, Captcha} from "./login-style"
import {email, maxLength, required} from "../common/forms/validators"
import {stateType} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {InjectedFormProps} from "redux-form/lib/reduxForm";

type propsType = {
    captcha: string | null
    isAuthorized: boolean
    isFetching: boolean
    login: (payload: loginPayloadType) => void
}

type loginFormOwnProps = {
    captcha: string | null
}

const Login: FC<propsType> = (props) => {
    let login = (payload: loginPayloadType) => props.login(payload)

    if (props.isAuthorized) return <Redirect to={"/profile"}/>

    return (
        <Container>
            <LoginReduxForm onSubmit={login} captcha={props.captcha}/>
        </Container>
    )
}

const maxLength25 = maxLength(25)

const LoginForm: FC<InjectedFormProps<loginPayloadType, loginFormOwnProps> & loginFormOwnProps> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group className={"text-center text-white"}>
                <Form.Label>Email address</Form.Label>
                <Field name={"email"} component={Input} type={"input"}
                              placeholder={"Enter email"} validate={[required, email, maxLength25]}/>
            </Form.Group>
            <Form.Group className={"text-center text-white"}>
                <Form.Label>Password</Form.Label>
                <Field name={"password"} component={Input} type={"password"}
                              placeholder={"Password"} validate={[required, maxLength25]}/>
            </Form.Group>
            <Form.Group className={"text-center text-white"}>
                <label>
                    <Field name={"rememberMe"} component={"input"} type={"checkbox"}/>
                    <span> Remember me</span>
                </label>
            </Form.Group>
            <Form.Group>
                {props.captcha !== null &&
                <>
                    <Captcha src={props.captcha} className={"mb-3"}/>
                    <Field name={"captcha"} component={Input} type={"input"} placeholder={"captcha"}/>
                </>
                }
            </Form.Group>
            {props.error && <div className={"response-error text-center mb-3"}>{props.error}</div>}
            <Button as={"button"} variant={"primary"} className={"d-block m-auto shadow-none"}>Enter</Button>
        </Form>
    )
}

const LoginReduxForm = reduxForm<loginPayloadType, loginFormOwnProps>({form: "authorization"})(LoginForm)

const mapStateToProps = (state: stateType) => ({
    isAuthorized: state.auth.isAuthorized,
    captcha: state.auth.captcha,
    isFetching: state.app.isFetching
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateType, undefined, Action>) => ({
    login: (payload: loginPayloadType) => dispatch(login(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
