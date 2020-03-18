import {sendMessageAC} from "../../redux/messages-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogItem: state.messages.dialogItem,
        messageItem: state.messages.messageItem,
        isAuth: state.auth.isAuth,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessageAC(message)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Messages);