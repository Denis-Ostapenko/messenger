import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessages } from "../../models/IMessages";

interface MessageState {
    messageActiveId: string | null;
    loading: boolean;
    error: null | string;
}

const initialState: MessageState = {
    messageActiveId: null,
    loading: false,
    error: null

}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messagefetch(state) {
            state.loading = true;
        },
        messageSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.messageActiveId = action.payload;
        },
        messagefetchError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        messageСlear(state) {
            state.messageActiveId = null;
            state.loading = false;
            state.error = null;
        },
    }
})

export default messageSlice.reducer;