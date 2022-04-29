import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { persistReducer } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import storage from 'redux-persist/lib/storage/session'; // sessionStorage
// import storage from 'redux-persist/lib/storage/'; // localStorage

import globalSlice from "./slice/global-slice";
import authSlice from "./slice/auth-slice";
import bookSlice from "./slice/book-slice";
import postSlice from "./slice/post-slice";


import middleware from "./middleware";
import persistStore from "redux-persist/lib/persistStore";

const reducer = combineReducers({
  global: globalSlice.reducer,
  auth: authSlice.reducer,
  book: bookSlice.reducer,
  post: postSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['book', 'post', 'auth', 'global'],
  blacklist: ['global'],
}

export const persistedReducer = persistReducer(persistConfig, reducer)

const generateStore = (reducer) => {
  return configureStore({
    reducer,
    middleware: [thunk, logger, ...middleware],
    devTools: process.env.NODE_ENV !== 'production'
  });
}

const store = () => {
  const isServer = typeof window === 'undefined';
  if(isServer) return generateStore(reducer);
  else {
    const store = generateStore(persistedReducer);
    const persistor = persistStore(store);
    return { persistor, ...store }
  }
}

export const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV !== 'production'
}) 

