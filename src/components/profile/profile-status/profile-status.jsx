import React, {useEffect, useState} from "react";
import {Container} from "./profile-status-style";

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => setEditMode(true);
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    };
    const onStatusChange = (e) => setStatus(e.currentTarget.value);

    return (
        <Container>
            <div className={"mb-3 mt-3 text-center"}>
                {props.isOwner === false
                    ? <>{props.status !== null && <div className={"status"}>Status: {props.status}</div>}</>
                    : <>
                        {editMode === false
                            ? <div className={"status"} onClick={activateEditMode}>
                                {props.status !== null ? `Status: ${props.status}` : "no status"}</div>
                            : <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                                     value={status}/>
                        }
                    </>
                }
            </div>
        </Container>
    )
};

export default ProfileStatus;