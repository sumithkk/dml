// store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/userReducer'; // Update the import
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
  middleware: [thunk], // Apply Redux Thunk middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
