export const addPostActionCreator = () => ({type: "PUSH-POST"});
export const typingPostActionCreator = (current_text) => ({type: "WRITING-POST", typing: current_text});

let initialState = {
        user_info: {
            picture: {id: 1, path: undefined},
            description: [
                {id: 1, name: "Andrew"},
                {id: 28, age: 28},
                {id: 1, country: "Ukraine"},
            ],
        },
        write_post: "",
        post_items: [
            {id: 1, post: "My first post!", likes: 7},
            {id: 2, post: "The weather is good today!", likes: 5},
        ],
};

let profile_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "PUSH-POST": {
            let stateCopy = {...state};
            stateCopy.post_items = [...state.post_items];
            let calc_post_id = () => {let i = stateCopy.post_items.length; i++; return i};
            let new_post = {
                id: calc_post_id(),
                post: stateCopy.write_post,
                likes: 0,
            };
            stateCopy.post_items.push(new_post);
            stateCopy.write_post = "";
            return stateCopy;
        }
        case "WRITING-POST": {
            let stateCopy = {...state};
            stateCopy.write_post = {...state.write_post};
            stateCopy.write_post = action.typing;
            return stateCopy;
        }
        default: return state;
    }
};

export default profile_reducer;