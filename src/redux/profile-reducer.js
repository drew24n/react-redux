export const addPostAC = () => ({type: "PUSH-POST"});
export const typePostAC = (text) => ({type: "TYPE-POST", text});

let initialState = {
        userInfo: {
            picture: {id: 1, path: ""},
            description: [
                {id: 1, name: "Andrew", age: 28, country: "Ukraine"},
            ],
        },
        typePost: "",
        postItems: [
            {id: 1, post: "My first post!", likes: 7},
            {id: 2, post: "The weather is good today!", likes: 5},
        ],
};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PUSH-POST": {
            let stateCopy = {...state, postItems: [...state.postItems]};
            let newPost = {
                id: () => {let i = stateCopy.postItems.length; i++; return i},
                post: stateCopy.typePost,
                likes: 0,
            };
            stateCopy.postItems.push(newPost);
            stateCopy.typePost = "";
            return stateCopy;
        }
        case "TYPE-POST": return {...state, typePost: action.text};
        default: return state;
    }
};

export default profileReducer;