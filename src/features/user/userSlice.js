import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { login } from "../../utils/auth";

// login action async
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({email, password}, thunkAPI) => {
    try{
      const response = await api().post('/api/login', {email, password});
      if(response.status === 200) {
        login(response.data.data.token);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)
// get user information async
export const fetchingUser = createAsyncThunk(
  'user/fetchingUser',
  async ({token}, thunkAPI) => {
    try{
      const response = await api().get('/api/user', {headers: {Authorization: `Bearer ${token}`}})
      if(response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

// logout action async
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async ({token}, thunkAPI) => {
    const response = await api().post('/api/logout', {}, {headers: {Authorization: `Bearer ${token}`}})
      if(response.status === 200) {
        console.log(response)
        return response.data;
      } else {
        console.log(response)
        return thunkAPI.rejectWithValue(response);
      }
  }
)

const initialState = {
  data: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: []
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.data = {};

      return state;
    }
  },
  extraReducers: {
    // login user
    [loginUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload.data.user;
    },
    [loginUser.pending]: (state, action) => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    // fetching user data
    [fetchingUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload.data.user;
    },
    [fetchingUser.pending]: (state, action) => {
      state.isFetching = true;
    },
    [fetchingUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    // logout user
    [logoutUser.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [logoutUser.pending]: (state, action) => {
      state.isFetching = true;
    },
    [logoutUser.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    }
  }
})

export const {clearState} = userSlice.actions;
export const userSelector = state => state.user;