import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessages } from "../../models/IMessages";

interface AllMesagesState {
    messages: string[];
    loading: boolean;
    error: null | string;
}

const initialState: AllMesagesState = {
    messages: [],
    loading: false,
    error: null
}

export const allMessagesSlice = createSlice({
    name: 'allMessages',
    initialState,
    reducers: {
        messagesfetch(state) {
            state.loading = true;
        },
        messagesfetchSuccess(state, action: PayloadAction<string[]>) {
            state.loading = false;
            state.error = null;
            state.messages = action.payload;
        },
        messagesfetchError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        createMessages(state, action: PayloadAction<string[]>) {
            state.loading = false;
            state.messages = [...action.payload, ...state.messages];
        },
        messagesСlear(state) {
            state.messages = [];
            state.loading = false;
            state.error = null;
        },
    }
})

export default allMessagesSlice.reducer;