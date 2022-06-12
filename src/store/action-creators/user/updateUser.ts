import { AppDispatch } from "../.."
import { userSlice } from "../../reducers/userReducer"


export const updateUserFriends = (friend:string) => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.updateUserFriends(friend))
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(userSlice.actions.userLoginError(message))
    }
}