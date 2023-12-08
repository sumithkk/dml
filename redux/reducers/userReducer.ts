// userReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersState {
  data: User[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: UsersState = {
  data: [],
  loading: 'idle',
  error: null,
  totalPages: 0,
  currentPage: 1
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<User[]>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
    },
    fetchPages:(state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    fetchCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { fetchUsers, fetchPages, fetchCurrentPage } = usersSlice.actions;

export default usersSlice.reducer;
