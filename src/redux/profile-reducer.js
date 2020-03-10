let initialState = {
        userProfile: {
            aboutMe: "",
            contacts: {
                facebook: "",
                website: "",
                vk: "",
                twitter: "",
                instagram: "",
                youtube: "",
                github: "",
                mainLink: "",
            },
            lookingForAJob: false,
            lookingForAJobDescription: "",
            fullName: "",
            userId: 0,
            photos: {
                small: "",
                large: ""
            }
        },
        typePost: "",
        postItems: [
            {id: 1, post: "My first post!", likes: 7},
            {id: 2, post: "The weather is good today!", likes: 5},
        ],
        isFetching: false,
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
        case "USER-PROFILE": return {...state, userProfile: action.userProfile};
        case "IS-FETCHING": return {...state, isFetching: action.isFetching};
        default: return state;
    }
};

export const addPostAC = () => ({type: "PUSH-POST"});
export const typePostAC = (text) => ({type: "TYPE-POST", text});
export const setUserProfile = (userProfile) => ({type: "USER-PROFILE", userProfile});
export const setIsFetching = (isFetching) => ({type: "IS-FETCHING", isFetching});

export default profileReducer;