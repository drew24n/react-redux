import {API} from "../components/api/api";
import {stopSubmit} from "redux-form";

const PUSH_POST = "PUSH_POST";
const USER_PROFILE = "USER_PROFILE";
const IS_FETCHING = "IS_FETCHING";
const SET_STATUS = "SET_STATUS";
const CHANGE_STATUS = "CHANGE_STATUS";
const SET_PROFILE_INFO = "SET_PROFILE_INFO";
const EDIT_MODE = "EDIT_MODE";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";

let initialState = {
        userProfile: {
            contacts: {},
            photos: {},
        },
        profileEditStatus: false,
        status: "",
        postItems: [
            {id: 1, post: "My first post!", likes: 7},
            {id: 2, post: "The weather is good today!", likes: 5},
        ],
        isFetching: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUSH_POST: {
            let postNumber = [...state.postItems].length + 1;
            return {...state, postItems: [...state.postItems, {id: postNumber, post: action.post, likes: 0}]};
        }
        case USER_PROFILE: return {...state, userProfile: action.userProfile};
        case IS_FETCHING: return {...state, isFetching: action.isFetching};
        case CHANGE_STATUS: return {...state, status: action.status};
        case SET_STATUS: return {...state, status: action.status};
        case SET_PROFILE_INFO: return {...state, userProfile: action.info};
        case EDIT_MODE: return {...state, profileEditStatus: action.value};
        case SET_PROFILE_PHOTO: return {...state, userProfile: {...state.userProfile, photos: action.photo}};
        default: return state;
    }
};

export const addPostAC = (post) => ({type: PUSH_POST, post});
export const setUserProfile = (userProfile) => ({type: USER_PROFILE, userProfile});
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching});
export const changeStatus = (status) => ({type: CHANGE_STATUS, status});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setProfileInfo = (info) => ({type: SET_PROFILE_INFO, info});
export const editMode = (value) => ({type: EDIT_MODE, value});
export const savePhotoSuccess = (photo) => ({type: SET_PROFILE_PHOTO, photo});

export const getProfile = (usersId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        // if (usersId === undefined) {usersId = 2}
        let response = await API.getProfile(usersId);
        dispatch(setUserProfile(response));
        dispatch(setIsFetching(false));
    }
};

export const updateStatus = (status) => {
    return async (dispatch) => {
        try {
            let response = await API.updateStatus(status);
            if (response.data.resultCode === 0) dispatch(changeStatus(status))
        }
        catch (error) {
            alert("Status update error")
        }
    }
};

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await API.getStatus(userId);
            if (response.status === 200) dispatch(setStatus(response.data))
    }
};

// export const updateProfileInfo = (info) => {
//     return async (dispatch, getState) => {
//         const user_id = getState().auth.id;
//         let response = await API.updateProfileInfo(info);
//         if (response.data.resultCode === 0) {
//             dispatch(setProfileInfo(info));
//             dispatch(editMode(false));
//             getProfile(user_id)
//         } else {
//             dispatch(stopSubmit("profileInfo", {_error: response.data.messages[0]}));
//             // dispatch(editMode(true));
//             // return Promise.reject(response.data.messages[0])
//         }
//     }
// };

export const updateProfileInfo = (info) => {
    return (dispatch, getState) => {
        const user_id = getState().auth.id;
        API.updateProfileInfo(info).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setProfileInfo(info));
                dispatch(editMode(false));
                getProfile(user_id)
            } else {
                dispatch(stopSubmit("profileInfo", {_error: response.data.messages[0]}));
                // dispatch(editMode(true));
                // return Promise.reject(response.data.messages[0])
            }
        });
    }
};

export const savePhoto = (photo) => {
    return async (dispatch) => {
        const response = await API.uploadPhoto(photo);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
};

export default profileReducer;