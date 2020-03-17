import {API} from "../components/api/api";

const PUSH_POST = "PUSH_POST";
const TYPE_POST = "TYPE_POST";
const USER_PROFILE = "USER_PROFILE";
const IS_FETCHING = "IS_FETCHING";
const SET_STATUS = "SET_STATUS";
const CHANGE_STATUS = "CHANGE_STATUS";

let initialState = {
        userProfile: {
            contacts: {},
            photos: {},
        },
        status: "",
        typePost: "",
        postItems: [
            {id: 1, post: "My first post!", likes: 7},
            {id: 2, post: "The weather is good today!", likes: 5},
        ],
        isFetching: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUSH_POST: {
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
        case TYPE_POST: return {...state, typePost: action.text};
        case USER_PROFILE: return {...state, userProfile: action.userProfile};
        case IS_FETCHING: return {...state, isFetching: action.isFetching};
        case CHANGE_STATUS: return {...state, status: action.status};
        case SET_STATUS: return {...state, status: action.status};
        default: return state;
    }
};

export const addPostAC = () => ({type: PUSH_POST});
export const typePostAC = (text) => ({type: TYPE_POST, text});
export const setUserProfile = (userProfile) => ({type: USER_PROFILE, userProfile});
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching});
export const changeStatus = (status) => ({type: CHANGE_STATUS, status});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getProfile = (usersId) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        if (usersId === undefined) {usersId = 2}
        API.getProfile(usersId).then(response => {
            dispatch(setUserProfile(response));
            dispatch(setIsFetching(false));
        })
    }
};

export const updateStatus = (status) => {
    return (dispatch) => {
        API.updateStatus(status).then(response => {
            if (response.data.resultCode === 0)
            dispatch(changeStatus(status))
        })
    }
};

export const getStatus = (userId) => {
    return (dispatch) => {
        API.getStatus(userId).then(response => {
            if (response.status === 200)
                dispatch(setStatus(response.data))
        })
    }
};

export default profileReducer;