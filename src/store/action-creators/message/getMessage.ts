import { AppDispatch } from "../.."
import { IMessages } from "../../../models/IMessages"
import { messageSlice } from "../../reducers/messageReducer"

export const getMessage = (messageId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(messageSlice.actions.messagefetch())
        dispatch(messageSlice.actions.messageSuccess(messageId))
    }
    catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(messageSlice.actions.messagefetchError(message))
    }
}