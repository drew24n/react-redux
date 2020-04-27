import {apiProfile} from "../api/api";
import {setErrorMessage, setIsFetching} from "./app-reducer";
import {SubmissionError} from "redux-form";

const SET_PROFILE = "SET_PROFILE";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";
const SET_STATUS = "SET_STATUS";
const SET_PROFILE_EDIT_MODE = "SET_PROFILE_EDIT_MODE";
const SET_IS_EDIT_IN_PROCESS = "SET_IS_EDIT_IN_PROCESS";

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
    profileEditMode: false,
    profileEditInProcess: false
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
        case SET_IS_EDIT_IN_PROCESS:
            return {...state, profileEditInProcess: action.profileEditInProcess};
        default:
            return state
    }
};

export const setProfile = (profile) => ({type: SET_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setProfileEditMode = (profileEditMode) => ({type: SET_PROFILE_EDIT_MODE, profileEditMode});
export const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTO, photos});
export const setIsEditInProcess = (profileEditInProcess) => ({type: SET_IS_EDIT_IN_PROCESS, profileEditInProcess});

export const getProfile = (userId) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
        let response = await apiProfile.getProfile(userId);
        dispatch(setProfile(response));
    } catch (e) {
        dispatch(setErrorMessage("an error occurred while loading a profile"))
    }
    dispatch(setIsFetching(false))
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await apiProfile.getStatus(userId);
    if (response.status === 200) {
        dispatch(setStatus(response.data))
    } else {
        dispatch(setErrorMessage("an error occurred while getting status"))
    }
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await apiProfile.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(setStatus(status))
    } else {
        dispatch(setErrorMessage("an error occurred white changing status"))
    }
};

export const updateProfilePhoto = (photo) => async (dispatch) => {
    let response = await apiProfile.updateProfilePhoto(photo);
    if (response.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.photos))
    } else {
        dispatch(setErrorMessage("an error occurred while changing profile photo"))
    }
};

export const updateProfileInfo = (profile) => async (dispatch) => {
    dispatch(setIsEditInProcess(true));
    let response = await apiProfile.updateProfileInfo(profile);
    if (response.resultCode === 0) {
        dispatch(setProfile(profile));
        dispatch(setProfileEditMode(false))
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : "unknown error occurred";
        throw new SubmissionError({_error: message})
    }
    dispatch(setIsEditInProcess(false));
};

export default profileReducer;