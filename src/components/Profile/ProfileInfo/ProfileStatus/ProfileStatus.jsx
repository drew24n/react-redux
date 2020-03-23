import React from "react";
import style from "./profile_status.module.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class ProfileStatus extends React.Component {

    state = {
        isEditable: false,
        status: this.props.status,
    };

    enableEdit = () => {
        this.setState({isEditable: true});
    };

    changeLocalStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    disableEdit = () => {
        this.setState({isEditable: false});
        this.props.updateStatus(this.state.status);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    };

    render() {
        let usersId = Number(this.props.match.params.usersId);
        if (usersId) {
            return <div className={style.other_user}>
                    <p>Status:</p>
                    <span>{!this.props.status ? "no status" : this.props.status}</span>
                </div>
        } else {
            return <div className={style.my_status}>
                <p>Status:</p>
                {!this.state.isEditable && <span onClick={this.enableEdit}>{!this.props.status ? "no status" : this.props.status}</span>}
                {this.state.isEditable && <input onChange={this.changeLocalStatus}
                                                 onBlur={this.disableEdit}
                                                 autoFocus={true} value={this.state.status}/>}
            </div>
        }
    }
}


export default compose(withRouter)(ProfileStatus);