import {sendMessageAC, typeMessageAC} from "../../redux/messages-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogItem: state.messages.dialogItem,
        messageItem: state.messages.messageItem,
        typeMessage: state.messages.typeMessage,
        isAuth: state.auth.isAuth,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        typeMessageFunc: (text) => dispatch(typeMessageAC(text)),
        sendMessage: () => dispatch(sendMessageAC()),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Messages);