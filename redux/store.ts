import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/userReducer';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
