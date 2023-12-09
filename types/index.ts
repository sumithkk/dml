
import { Dispatch } from 'redux';

export type AppDispatch = Dispatch<any>;

export interface AuthState {
  username: string;
  password: string;
}
