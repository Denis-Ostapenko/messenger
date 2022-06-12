import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import allUsersReducer from "./reducers/allUsersReducer";
import userReducer from "./reducers/userReducer";
import allMessagesReducer from "./reducers/allMessagesReducer";
import messageReducer from "./reducers/messageReducer";

const rootReducer = combineReducers({
    allUsersReducer,
    userReducer,
    allMessagesReducer,
    messageReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch