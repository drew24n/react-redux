const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
        dialogItem: [
            {id: 21, name: "User1"},
            {id: 35, name: "User2"},
        ],
        messageItem: [
            {id: 11, content: "Hi, how are you?"},
            {id: 23, content: "I'm fine, thank you."},
        ],
};

const messagesReducer = (state = initialState, action) => {
    if (action.type === SEND_MESSAGE) {
        let messageNumber = [...state.messageItem].length + 1;
        return {...state, messageItem: [...state.messageItem, {id: messageNumber, content: action.message}]};
    } else return state;
};

export const sendMessageAC = (message) => ({type: SEND_MESSAGE, message});

export default messagesReducer;