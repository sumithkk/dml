import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { fetchUsers, fetchPages, fetchCurrentPage } from '../reducers/userReducer';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const getUsers = (page: number): ThunkAction<void, RootState, null, any> => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    dispatch(fetchUsers(data.data));
    dispatch(fetchPages(data.total_pages));
    dispatch(fetchCurrentPage(data.page));

  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
