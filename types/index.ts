
import { Dispatch } from 'redux';

export type AppDispatch = Dispatch<any>;

export interface AuthState {
  username: string; // Assuming 'username' is a string
}

export interface Person {
  id: number;
  name: string;
  age: number;
  profession: string;
}

export interface PersonState {
  persons: Person[];
}