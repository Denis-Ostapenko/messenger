import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser"

interface UserState {
    user: IUser | null;
    token: null | string;
    messageActiveId: string | null;
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    user: null,
    token: localStorage.getItem('token'),
    messageActiveId: null,
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
        userError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        userLoginToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        updateUserFriends(state, action: PayloadAction<string[]>) {
            if (state.user) {
                state.user.friends = [...action.payload];
            }
        },
        updateUserMessages(state, action: PayloadAction<string[]>) {
            if (state.user) {
                state.user.messages = [...action.payload];
            }
        },
        messageSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.messageActiveId = action.payload;
        },
        userСlear(state) {
            state.user = null;
            state.loading = false;
            state.messageActiveId = null;
            state.token = null;
            state.error = null;
        }
    }
})

export default userSlice.reducer;