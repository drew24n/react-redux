import React from "react"
import {Redirect} from "react-router-dom"

export const withAuthRedirect = (Component) => (props) => {
    if (props.isAuthorized === false) return <Redirect to={"/login"}/>
    else return <Component {...props}/>
}