import React from "react";
import style from "./profile_status.module.css";

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

    render() {
        return <div className={style.container}>
            <p>Status:</p>
            {!this.state.isEditable && <span onClick={this.enableEdit}>{this.props.status}</span>}
            {this.state.isEditable && <input onChange={this.changeLocalStatus}
                                             onBlur={this.disableEdit}
                                             autoFocus={true} value={this.state.status}/>}
        </div>
    }
}


export default ProfileStatus;