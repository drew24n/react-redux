import React, {FC} from "react"
import {Button, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {setErrorMessage} from "../../../redux/app-reducer"
import {stateType} from "../../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

type mapStateToProps = {
    error: string | null
}

type mapDispatchToProps = {
    setErrorMessage: (error: string | null) => void
}

type propsType = mapStateToProps & mapDispatchToProps

const Error: FC<propsType> = (props) => {
    const closeErrorMessage = () => props.setErrorMessage(null)

    return (
        <Modal show={props.error !== null} onHide={setErrorMessage} centered style={{zIndex: 10000}}>
            <Modal.Header closeButton>
                <Modal.Title>An error occurred:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.error}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeErrorMessage}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state: stateType) => ({
    error: state.app.error
})

const mapDispatchToProps = (dispatch: ThunkDispatch<stateType, undefined, Action>) => ({
    setErrorMessage: (error: string | null) => dispatch(setErrorMessage(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Error)
