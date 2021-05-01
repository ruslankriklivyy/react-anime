import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../api/api';
import { UsersRespones } from '../types/types';

const initialState = {
  users: null as UsersRespones | null,
};

export const getUsers = createAsyncThunk('users/getUsers', async (props, thunkApi) => {
  const data = await usersApi.fetchUsers();
  thunkApi.dispatch(setUsers(data));
});

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default users.reducer;
export const { setUsers } = users.actions;
