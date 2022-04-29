import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

/* initial */
const name = 'book';

const initialState = {
  query: '',
  isEnd: false,
  totalCount: 0,
  books: [],
}

/* async action */
export const retrieveBook = createAsyncThunk(`${name}/retrieveBook`, async ({ query, size = 30, page = 1 }, thunkApi) => {
  try {
    const url = process.env.REACT_APP_BOOK_URL;
    const options = {
      params: { query , size, page },
      headers: {
        Authorization: 'KakaoAK ' + process.env.REACT_APP_KAKAO_KEY
      }
    }
    const { data: { documents, meta } } = await axios.get(url, options);

    return new Promise((resolve, reject) => {
      setInterval(() => {
        resolve({ books: documents, isEnd: meta.is_end, totalCount: meta.total_count })
      }, 2000);
    })
    // return { books: documents, isEnd: meta.is_end, totalCount: meta.total_count };
  }
  catch(err) {
    return thunkApi.rejectWithValue(err.response.data);
  }
})


/* sync reducer */
const reducers = {
  resetBook(state, action) {
    // state = {...initialState}; // books x 
    Object.assign(state, initialState);
  },
  setQuery(state, action) {
    state.query = action.payload;
  }
}


/* extraReducer */
const extraReducers = builder => builder
.addCase(retrieveBook.pending, (state, action) => {
  
})
.addCase(retrieveBook.fulfilled, (state, action) => {
  state.books.push(...action.payload.books);
  state.isEnd = action.payload.isEnd;
  state.totalCount = action.payload.totalCount;
})
.addCase(retrieveBook.rejected, (state, action) => {
  
})


/* createSlice */
const bookSlice = createSlice({ name, initialState, reducers, extraReducers });


/* user Getter */



/* export */
export const { resetBook, setQuery } = bookSlice.actions
export default bookSlice;



