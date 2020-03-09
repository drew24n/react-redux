export const sendMessageAC = () => ({type: "SEND-MESSAGE"});
export const typeMessageAC = (text) => ({type: "TYPE-MESSAGE", text});

let initialState = {
        dialogItem: [
            {id: 21, name: "Julia"},
            {id: 35, name: "Kate"},
        ],
        typeMessage: "",
        messageItem: [
            {id: 11, content: "Hi, how are you?"},
            {id: 23, content: "I'm fine, thank you."},
        ],
};

let messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TYPE-MESSAGE": return {...state, typeMessage: action.text};
        case "SEND-MESSAGE": {
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

export default messagesReducer;