import React, {FC} from "react"
import {Container} from "./input-style"
import {WrappedFieldProps} from "redux-form";

export const Input: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    return (
        <Container>
            <input{...input}{...props}/>
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </Container>
    )
}
