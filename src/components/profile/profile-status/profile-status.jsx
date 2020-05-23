import React, {memo, useEffect, useState} from "react"
import {Container} from "./profile-status-style"
import {compose} from "redux"
import {OverlayTrigger, Tooltip} from "react-bootstrap"

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => setEditMode(true)
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) => setStatus(e.currentTarget.value)

    return (
        <Container>
            <div className={"mb-2 mt-2 text-center"}>
                {props.isOwner === false
                    ? <>{props.status !== null && <div className={"status"}>Status: {props.status}</div>}</>
                    : <>
                        {editMode === false
                            ? <OverlayTrigger key={"bottom"} placement={"bottom"} overlay={
                                <Tooltip id={"tooltip-bottom"}>
                                    click to update status!
                                </Tooltip>}>
                                <div className={"status-owner"} onClick={activateEditMode}>
                                    {props.status !== null ? `Status: ${props.status}` : "no status"}</div>
                            </OverlayTrigger>
                            : <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                                     value={status}/>
                        }
                    </>
                }
            </div>
        </Container>
    )
}

export default compose(memo)(ProfileStatus)