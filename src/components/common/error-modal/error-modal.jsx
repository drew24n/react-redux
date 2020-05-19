import React from "react"
import {Button, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {setErrorMessage} from "../../../redux/app-reducer"

const Error = (props) => {
    const setErrorMessage = () => props.setErrorMessage(null)

    return (
        <Modal show={props.error !== null} onHide={setErrorMessage} centered>
            <Modal.Header closeButton>
                <Modal.Title>An error occurred:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.error}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={setErrorMessage}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    error: state.app.error
})

const mapDispatchToProps = (dispatch) => ({
    setErrorMessage: (error) => dispatch(setErrorMessage(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Error)