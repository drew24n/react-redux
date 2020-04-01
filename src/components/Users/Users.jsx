import React from "react";
import style from "./users.module.css";
import defaultProfilePicture from  "../../assets/images/default_user_pic.png"
import {NavLink} from "react-router-dom";
import {Pagination, PageItem} from "react-bootstrap";

let Users = (props) => {

    let pagesAmount = Math.ceil(props.usersAmount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesAmount; i++) {pages.push(i)}

    let fractionsAmount = Math.ceil(pagesAmount / props.fractionSize);
    let fractionLeftEnd = (props.currentFraction - 1) * props.fractionSize + 1;
    let fractionRightEnd = props.currentFraction * props.fractionSize;

    return (
        <div className={style.container}>
            <Pagination size="md" className={style.pagination}>
                <Pagination.First onClick={() => props.changeFraction(1)}/>
                <Pagination.Prev className={props.currentFraction <= 1 && "disabled"}
                                 onClick={() => props.changeFraction(props.currentFraction - 1)}/>
                {pages.filter(p => p >= fractionLeftEnd && p <= fractionRightEnd)
                .map(p => <PageItem key={p} className={props.currentPage === p && "active"}
                                onClick={() => props.changePage(p, props.pageSize)}>{p}</PageItem>)}
                <Pagination.Next className={props.currentFraction >= fractionsAmount && "disabled"}
                                 onClick={() => props.changeFraction(props.currentFraction + 1)}/>
                <Pagination.Last onClick={() => props.changeFraction(fractionsAmount)}/>
            </Pagination>
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
        </div>
    )
};
export default Users;