import { AppDispatch } from "../.."
import { messageSlice } from "../../reducers/messageReducer"

export const messageСlear = () => (dispatch: AppDispatch) => {
        dispatch(messageSlice.actions.messageСlear())
}