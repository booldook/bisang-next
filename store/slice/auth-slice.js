import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

/* initial */
const name = 'auth';

const initialState = {
  isLogging: false,
  user: {
    idx: '',
    userid: '',
    username: '',
    email: '',
    grade: '',
  },
  message: '',
  token: '',
  refreshToken: '',
}

/* async action */
export const logIn = createAsyncThunk(`${name}/logIn`, async ({ userid, userpw }, thunkApi) => {
  try {
    const url = process.env.REACT_APP_SERVER_URL + '/api/token';
    const params = { userid, userpw }
    const options = {  }
    const { data } = await axios.post(url, params, options);
    return data.success ? { isLogging: true, user: data.user, token: data.token }
                        : { isLogging: false, user: null, message: data.message }
  }
  catch(err) {
    return thunkApi.rejectWithValue(err.response.data);
  }
})


/* sync reducer */
const reducers = {
  resetAuth(state, action) {
    Object.assign(state, initialState);
  },
  logOut(state, action) {
    Object.assign(state, initialState);
  }
}


/* extraReducer */
const extraReducers = builder => builder
.addCase(logIn.pending, (state, action) => {

})
.addCase(logIn.fulfilled, (state, action) => {
  state.isLogging = action.payload.isLogging;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.message = action.payload.message;
})
.addCase(logIn.rejected, (state, action) => {
  
})


/* createSlice */
const authSlice = createSlice({ name, initialState, reducers, extraReducers });


/* user Getter */



/* export */
export const { resetAuth, logOut } = authSlice.actions
export default authSlice;



