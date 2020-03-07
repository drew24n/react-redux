export const sendMessageActionCreator = () => ({type: "SEND-MESSAGE"});
export const typingMessageActionCreator = (text_typing) => ({type: "TYPE-MESSAGE", text: text_typing});

let initialState = {
        dialog_item: [
            {id: 2, name: "Julia"},
            {id: 3, name: "Kate"},
        ],
        write_message: "",
        message_item: [
            {id: 1, content: "Hi, how are you?"},
            {id: 2, content: "I'm fine, thank you."},
        ],
};

let message_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TYPE-MESSAGE": {
            let stateCopy = {...state};
            stateCopy.write_message = {...state.write_message};
            stateCopy.write_message = action.text;
            return stateCopy;
        }
        case "SEND-MESSAGE": {
            let stateCopy = {...state};
            stateCopy.message_item = [...state.message_item];
            let calc_message_id = () => {let i = stateCopy.message_item.length; i++; return i;};
            let new_message = {
                id: calc_message_id(),
                content: stateCopy.write_message,
            };
            stateCopy.message_item.push(new_message);
            stateCopy.write_message = "";
            return stateCopy;
        }
        default: return state;
    }
};

export default message_reducer;