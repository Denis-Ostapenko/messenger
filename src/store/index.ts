import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import allUsersReducer from './reducers/allUsersReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    allUsersReducer,
    userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
