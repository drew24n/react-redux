import React from "react";
import style from "./custom_form.module.css";

export const CustomTextarea = ({input, meta, ...props}) => {
    return (
        <div>
            <div>
                <textarea{...input}{...props}/>
            </div>
            {meta.touched && meta.error ? <div className={style.error_message}>{meta.error}</div> : undefined}
        </div>
    )
};

export const CustomInput = ({input, meta, ...props}) => {
    return (
        <div>
            <div>
                <input{...input}{...props}/>
            </div>
            {meta.touched && meta.error ? <div className={style.error_message}>{meta.error}</div> : undefined}
        </div>
    )
};