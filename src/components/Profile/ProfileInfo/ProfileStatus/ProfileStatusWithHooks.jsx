import React, {useState, useEffect} from "react";
import style from "./profile_status.module.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const ProfileStatusWithHooks = React.memo((props) => {

    let [status, updateStatus] = useState(props.status);
    const changeStatus = (e) => updateStatus(e.currentTarget.value);

    let [editMode, setIsEdit] = useState(false);
    const activateEditMode = () => setIsEdit(true);
    const deactivateEditMode = () => {
        setIsEdit(false);
        props.updateStatus(status)
    };

    useEffect(() => updateStatus(props.status), [props.status]);

    let usersId = Number(props.match.params.usersId);
    if (usersId && usersId !== props.myId) {
        return <div className={style.other_user}>
            <span>Status: </span>
            <span>{!props.status ? "no status" : props.status}</span>
        </div>
    } else {
        return <div className={style.my_status}>
            <p>Status:</p>
            {!editMode &&
            <span onClick={activateEditMode}>{!props.status ? "no status" : props.status}</span>}
            {editMode && <input onChange={changeStatus}
                                             onBlur={deactivateEditMode}
                                             autoFocus={true} value={status}/>}
        </div>
    }
});

export default compose(withRouter)(ProfileStatusWithHooks);