const TYPE_MESSAGE = "TYPE_MESSAGE";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
        dialogItem: [
            {id: 21, name: "User1"},
            {id: 35, name: "User2"},
        ],
        typeMessage: "",
        messageItem: [
            {id: 11, content: "Hi, how are you?"},
            {id: 23, content: "I'm fine, thank you."},
        ],
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE_MESSAGE: return {...state, typeMessage: action.text};
        case SEND_MESSAGE: {
            let stateCopy = {...state, messageItem: [...state.messageItem]};
            let newMessage = {
                id: () => {let i = stateCopy.messageItem.length; i++; return i;},
                content: stateCopy.typeMessage,
            };
            stateCopy.messageItem.push(newMessage);
            stateCopy.typeMessage = "";
            return stateCopy;
        }
        default: return state;
    }
};

export const sendMessageAC = () => ({type: SEND_MESSAGE});
export const typeMessageAC = (text) => ({type: TYPE_MESSAGE, text});

export default messagesReducer;