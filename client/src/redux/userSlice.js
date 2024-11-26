import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  loginUser,
  registerUser,
} from "./actions/userActions";

// const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: null,
    token: token,
    error: null,
    success: false,
    contactOnlines: [],
    socketConnection: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.success = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
    setContactOnlines: (state, action) => {
      state.contactOnlines = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = {
        ...action.payload.data,
      };
      state.token = action.payload.token;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = {
        ...action.payload.data,
      };
      state.token = action.payload.token;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = {
        ...action.payload.data,
      };
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = action.payload;
    });
  },
});

export const { logout, clearError, setContactOnlines, setSocketConnection } = userSlice.actions;

export default userSlice.reducer;
