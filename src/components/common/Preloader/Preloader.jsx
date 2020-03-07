import React from "react";
import style from "./preloader.module.css";
import preloader from "../../../assets/images/preloader/oval.svg"

let Preloader = () => {
        return (
            <div className={style.preloader}>
                <img className={style.preloader_img} src={preloader} alt="no connection..."/>
            </div>
        )
};

export default Preloader;