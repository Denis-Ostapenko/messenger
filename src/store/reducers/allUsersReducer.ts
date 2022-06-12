import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser"

interface UsersState {
  users: IUser[];
  loading: boolean;
  error: null | string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null

}

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    usersfetch(state) {
      state.loading = true;
    },
    usersfetchSuccess(state, action: PayloadAction<IUser[]>) {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
    },
    usersfetchError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    usersСlear(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
  },
  }
})

export default allUsersSlice.reducer;
