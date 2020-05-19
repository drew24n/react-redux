import React from "react"
import {Container} from "./forms-style"

export const Input = ({input, meta, ...props}) => {
    return (
        <Container>
            <input{...input}{...props}/>
            {meta.touched && meta.error ?
                <div>{meta.error}</div> : null}
        </Container>
    )
}