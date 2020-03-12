import React from "react";
import style from "./users.module.css";
import defaultProfilePicture from  "../../assets/images/default_user_pic.png"
import {NavLink} from "react-router-dom";
import {API} from "../api/api";

let Users = (props) => {
    let pagesAmount = Math.ceil(props.usersAmount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesAmount; i++) {pages.push(i)}

    let follow = (uid) => {
        API.follow(uid).then(response => {
            if (response.resultCode === 0) {props.follow(uid)}
        })
    };
    let unfollow = (uid) => {
        API.unfollow(uid).then(response => {
            if (response.resultCode === 0) {props.unfollow(uid)}
        })
    };

    return (
        <div>
            <div className={style.item_container}>{props.users.map(u =>
                <div key={u.id} className={style.item}>
                    <NavLink to={"/profile/" + u.id}>
                        <img className={style.picture} src={u.photos.small ? u.photos.small : u.photos.small = defaultProfilePicture} alt=""/>
                    </NavLink>
                    <div className={style.info}>
                        <div>Name: {u.name}</div>
                        <>{u.status ? <div>Status: {u.status}</div> : ""}</>
                    </div>
                        <div className={style.follow}>{u.followed
                                ? <input type="button" value="Unfollow" onClick={() => unfollow(u.id)}/>
                                : <input type="button" value="Follow" onClick={() => follow(u.id)}/>}
                        </div>
                </div>)}
            </div>
            <div className={style.pagination}>{pages.map(p => <span key={p} className={props.currentPage === p ? style.selected : style.page}
                          onClick={() => props.changePage(p)}>{p} </span>)}
            </div>
        </div>
    )
};

export default Users;