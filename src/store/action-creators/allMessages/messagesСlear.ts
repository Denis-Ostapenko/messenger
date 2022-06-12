import { AppDispatch } from "../.."
import { allMessagesSlice } from "../../reducers/allMessagesReducer"

export const messagesСlear = () => (dispatch: AppDispatch) => {
    dispatch(allMessagesSlice.actions.messagesСlear())
}