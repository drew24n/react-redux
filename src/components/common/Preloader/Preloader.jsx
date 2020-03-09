import React from "react";
import style from "./preloader.module.css";
import preloader from "../../../assets/images/preloader/oval.svg"

let Preloader = () => {
    return (
        <div className={style.backdrop}>
            <img className={style.svg} src={preloader} alt=""/>
        </div>
    )
};

export default Preloader;