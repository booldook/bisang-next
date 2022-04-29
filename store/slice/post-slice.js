import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

/* initial */
const name = 'post';

const initialState = {
  isLoading: false,
  posts: [],
  post: {},
  page: 1,
  pager: {},
  err: null
}

/* async action */
export const retrievePost = createAsyncThunk(`${name}/retrievePost`, async ({ page = 1 }, thunkApi) => {
  try {
    const url = process.env.REACT_APP_SERVER_URL + '/api/posts/' + page;
    console.log(thunkApi.getState().auth.token);
    const options = {
      headers: {
        Authorization: thunkApi.getState().auth.token
      }
    }
    const { data: { posts, pager } } = await axios.get(url, options);

    // return new Promise((resolve, reject) => setInterval(() => resolve({ posts, pager }), 1000));
    return { posts, pager };
  }
  catch(err) {
    return thunkApi.rejectWithValue(err.response.data);
  }
})


/* sync reducer */
const reducers = {
  setPage(state, action) {
    state.page = action.payload;
  },
  resetPost(state, action) {
    Object.assign(state, initialState);
  }
}


/* extraReducer */
const extraReducers = builder => builder
.addCase(retrievePost.pending, (state, action) => {
  state.isLoading = true;
})
.addCase(retrievePost.fulfilled, (state, action) => {
  state.isLoading = false;
  state.posts = action.payload.posts;
  state.pager = action.payload.pager;
})
.addCase(retrievePost.rejected, (state, action) => {
  state.isLoading = false;
  state.err = action.payload;
})


/* createSlice */
const postSlice = createSlice({ name, initialState, reducers, extraReducers });


/* user Getter */



/* export */
export const { setPage, resetPost } = postSlice.actions
export default postSlice;



