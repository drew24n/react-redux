import {sendMessageAC, typeMessageAC} from "../../redux/messages-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogItem: state.messages.dialogItem,
        messageItem: state.messages.messageItem,
        typeMessage: state.messages.typeMessage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        typeMessageFunc: (text) => dispatch(typeMessageAC(text)),
        sendMessage: () => dispatch(sendMessageAC()),
    }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;