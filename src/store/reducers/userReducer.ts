import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser"

interface UserState {
    user: IUser | null;
    token: null | string;
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state) {
            state.loading = true;
            state.error = null;
        },
        userLoginSuccess(state, action: PayloadAction<IUser>) {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        },
        userLoginError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        userLoginToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        userСlear(state) {
            state.user = null;
            state.loading = false;
            state.token = null;
            state.error = null;
        },
        updateUserFriends(state, action: PayloadAction<string>) {
            state.user!.friends = [action.payload, ...state.user?.friends!];
        },
    }
})

export default userSlice.reducer;