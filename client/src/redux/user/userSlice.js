// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//     },
//     signinSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     signinFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { signInStart, signinFailure, signinSuccess } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload; // should contain user object including ID
      state.loading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      // state.loading = true;

      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signinFailure,
  signinSuccess,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
