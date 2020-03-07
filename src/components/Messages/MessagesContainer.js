import {sendMessageActionCreator, typingMessageActionCreator} from "../../redux/messages_reducer";
import Messages from "./Messages";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialog_item: state.messages.dialog_item,
        message_item: state.messages.message_item,
        write_message: state.messages.write_message,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        type_message: (text_typing) => dispatch(typingMessageActionCreator(text_typing)),
        send_message: () => dispatch(sendMessageActionCreator()),
    }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;