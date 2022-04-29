import React, {} from 'react';
import { createStore } from '@reduxjs/toolkit';
import { wrapper, persistedReducer } from '../store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(persistedReducer);
const persistor = persistStore(store);


function App({ Component, pageProps }) {
  return (
    <PersistGate persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  )
}

export default wrapper.withRedux(App)
