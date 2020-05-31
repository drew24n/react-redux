import {setErrorMessage, setErrorMessageType, setIsFetching, setIsFetchingType} from "./app-reducer"
import {SubmissionError} from "redux-form"
import {apiProfile, profile} from "../api/api-profile"
import {ThunkAction} from "redux-thunk"
import {stateType} from "./redux-store"

const SET_PROFILE = "SET_PROFILE"
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO"
const SET_STATUS = "SET_STATUS"
const SET_PROFILE_EDIT_MODE = "SET_PROFILE_EDIT_MODE"
const SET_IS_EDIT_IN_PROCESS = "SET_IS_EDIT_IN_PROCESS"

type setProfileType = {
    type: typeof SET_PROFILE
    profile: profile
}

type photosType = {
    small: string
    large: string
}

type setStatusType = {
    type: typeof SET_STATUS
    status: string
}

type setProfileEditModeType = {
    type: typeof SET_PROFILE_EDIT_MODE
    profileEditMode: boolean
}

type setProfilePhotoType = {
    type: typeof SET_PROFILE_PHOTO
    photos: {
        small: string
        large: string
    }
}

type setIsEditInProcessType = {
    type: typeof SET_IS_EDIT_IN_PROCESS
    profileEditInProcess: boolean
}

type actionsType = setProfileType | setStatusType | setProfileEditModeType | setProfilePhotoType
    | setIsEditInProcessType | setIsFetchingType | setErrorMessageType

type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>

const initialState = {
    profile: {
        userId: null as number | null,
        aboutMe: null as string | null,
        lookingForAJob: false,
        lookingForAJobDescription: null as string | null,
        fullName: null as string | null,
        contacts: {
            github: null as string | null,
            vk: null as string | null,
            facebook: null as string | null,
            instagram: null as string | null,
            twitter: null as string | null,
            website: null as string | null,
            youtube: null as string | null,
            mainLink: null as string | null,
        },
        photos: {
            small: null as string | null,
            large: null as string | null
        } as object | undefined,
    },
    status: null as string | null,
    profileEditMode: false,
    profileEditInProcess: false
}

const profileReducer = (state = initialState, action: actionsType): typeof initialState => {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.profile}
        case SET_PROFILE_EDIT_MODE:
            return {...state, profileEditMode: action.profileEditMode}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_PROFILE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}}
        case SET_IS_EDIT_IN_PROCESS:
            return {...state, profileEditInProcess: action.profileEditInProcess}
        default:
            return state
    }
}

export const setProfile = (profile: profile): setProfileType => ({
    type: SET_PROFILE, profile
})
export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status})
export const setProfileEditMode = (profileEditMode: boolean): setProfileEditModeType => ({
    type: SET_PROFILE_EDIT_MODE, profileEditMode
})
export const setProfilePhoto = (photos: photosType): setProfilePhotoType => ({type: SET_PROFILE_PHOTO, photos})
export const setIsEditInProcess = (profileEditInProcess: boolean): setIsEditInProcessType => ({
    type: SET_IS_EDIT_IN_PROCESS, profileEditInProcess
})

export const getProfile = (userId: number): thunkActionType => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await apiProfile.getProfile(userId)
        dispatch(setProfile(response))
    } catch (e) {
        dispatch(setErrorMessage("an error occurred while loading a profile"))
    }
    dispatch(setIsFetching(false))
}

export const getStatus = (userId: number): thunkActionType => async (dispatch) => {
    let response = await apiProfile.getStatus(userId)
    if (response.status === 200) {
        dispatch(setStatus(response.data))
    } else {
        dispatch(setErrorMessage("an error occurred while getting status"))
    }
}

export const updateStatus = (status: string): thunkActionType => async (dispatch) => {
    let response = await apiProfile.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setStatus(status))
    } else {
        dispatch(setErrorMessage("an error occurred white changing status"))
    }
}

export const updateProfilePhoto = (photo: File): thunkActionType => async (dispatch) => {
    let response = await apiProfile.updateProfilePhoto(photo)
    if (response.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.photos))
    } else {
        dispatch(setErrorMessage("an error occurred while changing profile photo"))
    }
}

export const updateProfileInfo = (profile: profile): thunkActionType => async (dispatch) => {
    dispatch(setIsEditInProcess(true))
    let response = await apiProfile.updateProfileInfo(profile)
    if (response.resultCode === 0) {
        dispatch(setProfile(profile))
        dispatch(setProfileEditMode(false))
    } else {
        dispatch(setIsEditInProcess(false))
        let message = response.messages.length > 0 ? response.messages[0] : "unknown error occurred"
        throw new SubmissionError({_error: message})
    }
    dispatch(setIsEditInProcess(false))
}

export default profileReducer