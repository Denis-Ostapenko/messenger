import { AppDispatch } from "../.."
import { userSlice } from "../../reducers/userReducer"

export const userСlear = () => (dispatch: AppDispatch) => {
        dispatch(userSlice.actions.userСlear())
}