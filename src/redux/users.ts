import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, usersApi } from '../api/api';
import { Token, UsersRespones } from '../interfaces/interfaces';

const initialState = {
  users: null as UsersRespones | null,
  token: null as Token | null,
  isAuth: false as boolean,
  isLoading: false as boolean,
  userInfo: {
    email: '' as string,
    password: '' as string,
  },
};

interface ILogin {
  email: string;
  password: string;
}

export const getUsers = createAsyncThunk('users/getUsers', async (props, thunkApi) => {
  thunkApi.dispatch(setIsLoading(false));
  const data = await usersApi.fetchUsers();
  thunkApi.dispatch(setUsers(data));
  thunkApi.dispatch(setIsLoading(true));
});

export const loginUser = createAsyncThunk('users/loginUser', async (props: ILogin, thunkApi) => {
  thunkApi.dispatch(setIsAuth(false));
  thunkApi.dispatch(setUserInfo({ email: props.email, password: props.password }));

  const data = await authApi.login(props.email, props.password);
  if (!data.error) {
    thunkApi.dispatch(setIsAuth(true));
    thunkApi.dispatch(setToken(data));
  } else {
    thunkApi.dispatch(setIsAuth(false));
  }
});

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersRespones>) => {
      state.users = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<ILogin>) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action: PayloadAction<Token>) => {
      state.token = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default users.reducer;
export const { setUsers, setIsAuth, setUserInfo, setToken, setIsLoading } = users.actions;
