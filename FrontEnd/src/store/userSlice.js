import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: 'guest account',
  userId: 321654,
  loggedIn: false,
  loggingIn: false
}

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLoggedIn(state, {payload}) {
      const {val =true} = payload
      state.loggedIn = val
      state.loggingIn = false
    },
    setUserState(state, { payload }) {
      const { userName='guest account', userId= 321654} = payload
      state.userName = userName
      state.userId = userId
      state.loggedIn = true
      state.loggingIn = false
    },
    setLogginIn(state, {payload}) {
      const {loggingIn=false} = payload
      state.loggingIn = loggingIn
    }
  }
});

export const UserActions = userSlice.actions

export default userSlice;