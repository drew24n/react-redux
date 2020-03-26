import React from "react";
import style from "./users.module.css";
import defaultProfilePicture from  "../../assets/images/default_user_pic.png"
import {NavLink} from "react-router-dom";

let Users = React.memo((props) => {
    let pagesAmount = Math.ceil(props.usersAmount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesAmount; i++) {pages.push(i)}

    return (
        <div className={style.container}>
            <div className={style.item_container}>{props.users.map(u =>
                <div key={u.id} className={style.item}>
                    <NavLink to={`profile/` + u.id}>
                        <img className={style.picture} src={u.photos.small ? u.photos.small : u.photos.small = defaultProfilePicture} alt=""/>
                    </NavLink>
                    <div className={style.info}>
                        <div>Name: {u.name}</div>
                        <>{u.status ? <div>Status: {u.status}</div> : ""}</>
                    </div>
                        <div className={style.follow}>{u.followed
                            ? <button disabled={props.isFollowInProcess.some(id => id === u.id)} onClick={() => props.unfollowUser(u.id)}>Unfollow</button>
                            : <button disabled={props.isFollowInProcess.some(id => id === u.id)} onClick={() => props.followUser(u.id)}>Follow</button>}
                        </div>
                </div>)}
            </div>
            <div className={style.pagination}>{pages.map(p => <span key={p} className={props.currentPage === p ? style.selected : style.page}
                          onClick={() => props.changePage(p, props.pageSize)}>{p} </span>)}
            </div>
        </div>
    )
});
export default Users;