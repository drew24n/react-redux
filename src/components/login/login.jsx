import React from "react"
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {Button, Form} from "react-bootstrap"
import {Input} from "../common/forms/input"
import {login} from "../../redux/auth-reducer"
import {Container, Captcha} from "./login-style"
import {email, maxLength, required} from "../common/forms/validators"

const Login = (props) => {
    let login = (payload) => props.login(payload)

    if (props.isAuthorized === true) return <Redirect to={"/profile"}/>

    return (
        <Container>
            <LoginReduxForm onSubmit={login} captcha={props.captcha}/>
        </Container>
    )
}

const maxLength25 = maxLength(25)

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group className={"text-center text-white"}>
                <Form.Label>Email address</Form.Label>
                <Form.Control as={Field} name={"email"} component={Input} type={"input"}
                              placeholder={"Enter email"} validate={[required, email, maxLength25]}/>
            </Form.Group>
            <Form.Group className={"text-center text-white"}>
                <Form.Label>Password</Form.Label>
                <Form.Control as={Field} name={"password"} component={Input} type={"password"}
                              placeholder={"Password"} validate={[required, maxLength25]}/>
            </Form.Group>
            <Form.Group className={"text-center text-white"}>
                <Form.Check as={Field} name={"rememberMe"} component={"input"} type={"checkbox"}
                            label={"Remember me"}/>
            </Form.Group>
            <Form.Group>
                {props.captcha !== null &&
                <>
                    <Captcha src={props.captcha} className={"mb-3"}/>
                    <Form.Control as={Field} name={"captcha"} component={Input} type={"input"} placeholder={"captcha"}/>
                </>
                }
            </Form.Group>
            {props.error && <div className={"response-error text-center mb-3"}>{props.error}</div>}
            <Button variant={"primary"} type={"input"} className={"d-block m-auto shadow-none"}>Enter</Button>
        </Form>
    )
}

const LoginReduxForm = reduxForm({
    form: "authorization"
})(LoginForm)

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    captcha: state.auth.captcha,
    isFetching: state.app.isFetching
})

const mapDispatchToProps = (dispatch) => ({
    login: (payload) => dispatch(login(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)