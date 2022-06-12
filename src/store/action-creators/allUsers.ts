import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { allUsersSlice } from "../reducers/allUsersReducer";
import { AppDispatch } from "..";
import { IUser } from "../../models/IUser";


export const fetchUsers = () => async (dispatch: AppDispatch) => {
        try {
                dispatch(allUsersSlice.actions.usersfetch())
                const response = await getDocs(collection(db, "users"))
                const users: IUser[] = [];
                response.forEach((element) => {
                        const { nikname, image } = element.data();
                        const newUser: IUser = {
                                nikname,
                                image,
                                id: element.id
                        }
                        users.push(newUser)
                })
                dispatch(allUsersSlice.actions.usersfetchSuccess(users))
        } catch (error) {
                let message
                if (error instanceof Error) message = error.message
                else message = String(error)
                dispatch(allUsersSlice.actions.usersfetchError(message))
        }
}
