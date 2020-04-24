import {apiProfile} from "../api/api";
import {setIsFetching} from "./app-reducer";
import {stopSubmit} from "redux-form";

const SET_PROFILE = "SET_PROFILE";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";
const SET_STATUS = "SET_STATUS";
const SET_PROFILE_EDIT_MODE = "SET_PROFILE_EDIT_MODE";

const initialState = {
    profile: {
        userId: null,
        aboutMe: null,
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: null,
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null,
        },
        photos: {
            small: null,
            large: null
        },
    },
    status: null,
    profileEditMode: true
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case SET_PROFILE_EDIT_MODE:
            return {...state, profileEditMode: action.profileEditMode};
        case SET_STATUS:
            return {...state, status: action.status};
        case SET_PROFILE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state
    }
};

export const setProfile = (profile) => ({type: SET_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setProfileEditMode = (profileEditMode) => ({type: SET_PROFILE_EDIT_MODE, profileEditMode});
export const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTO, photos});

export const getProfile = (userId) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
        let response = await apiProfile.getProfile(userId);
        dispatch(setProfile(response));
    } catch (e) {
        alert("an error occurred trying to load a profile")
    }
    dispatch(setIsFetching(false))
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await apiProfile.getStatus(userId);
    if (response.status === 200) {
        dispatch(setStatus(response.data))
    }
};

export const updateStatus = (status) => async (dispatch) => {
    if (status) {
        try {
            let response = await apiProfile.updateStatus(status);
            if (response.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (e) {
            alert("Status update error")
        }
    }
};

export const updateProfilePhoto = (photo) => async (dispatch) => {
    let response = await apiProfile.updateProfilePhoto(photo);
    if (response.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.photos))
    }
};

export const updateProfileInfo = (profile) => async (dispatch) => {
    let response = await apiProfile.updateProfileInfo(profile);
    if (response.resultCode === 0) {
        dispatch(setProfile(profile));
        dispatch(setProfileEditMode(false))
    } else {
        dispatch(stopSubmit("profileInfo", {_error: response.data.messages[0]}));
    }
};

export default profileReducer;