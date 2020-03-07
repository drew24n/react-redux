import React from "react";
import style from "./Users.module.css";
import defaultProfilePicture from  "../../assets/images/default_user_pic.png"

let Users = (props) => {

    let pagesAmount = Math.ceil(props.users_amount / props.page_size);
    let pages = [];
    for (let i = 1; i <= pagesAmount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p =>
                    <span className={props.current_page === p ? style.selected_page : style.page} key={p}
                          onClick={() => props.switchPage(p)}
                    >{p} </span>)}
            </div>
            {props.users.map(u =>
                <div key={u.id} className={style.wrapper}>
                    <div className={style.picture}><img src={u.photos.small
                        ? u.photos.small
                        : u.photos.small = defaultProfilePicture} alt=""/></div>
                    <div>
                        <div>Name: {u.name}</div>
                        {u.status ? <div>Status: {u.status}</div> : ""}
                        <div className={style.buttons}>
                            {u.followed
                                ? <input type="button" value="Remove friend"
                                         onClick={() => props.unfollow(u.id)}/>
                                : <input type="button" value="Add to friends"
                                         onClick={() => props.follow(u.id)}/>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Users;