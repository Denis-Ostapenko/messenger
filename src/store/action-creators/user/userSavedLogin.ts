import { doc, getDoc } from "firebase/firestore";
import { AppDispatch } from "../..";
import { db } from "../../../firebase";
import { IUser } from "../../../models/IUser";
import { userSlice } from "../../reducers/userReducer";

export const userSavedLogin = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userLogin())
        const response = await getDoc(doc(db, "users", token));
        const newUser: IUser = {
            nikname: response.data()?.nikname,
            image: response.data()?.image,
            messages: response.data()?.messages,
            friends: response.data()?.friends, 
            id: response.data()?.id
        }
        dispatch(userSlice.actions.userLoginSuccess(newUser))
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        dispatch(userSlice.actions.userLoginError(message))
    }
}