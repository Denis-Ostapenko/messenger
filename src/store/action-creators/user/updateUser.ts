import { AppDispatch } from "../.."
import { userSlice } from "../../reducers/userReducer"


export const updateUserFriends = (friends:string[]) => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.updateUserFriends(friends))
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(userSlice.actions.userError(message))
    }
}

export const updateUserMessages = (message:string[]) => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.updateUserMessages(message))
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(userSlice.actions.userError(message))
    }
}