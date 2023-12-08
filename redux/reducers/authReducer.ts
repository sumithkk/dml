// redux/reducers/authReducer.ts

type Action = { type: string; payload?: any };

// Define action type constants
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

interface AuthState {
  loggedIn: boolean;
}

export const getInitialAuthState = (tokenFromCookies?: string): AuthState => {
  let loggedIn = false;

  if (typeof window !== 'undefined') {
    // Check if running on the client side
    const storedToken = localStorage.getItem('token');
    loggedIn = !!storedToken;
  } else {
    // Check if running on the server side during SSR
    loggedIn = !!tokenFromCookies;
  }

  return {
    loggedIn,
  };
};

const initialState: AuthState = getInitialAuthState();

const authReducer = (state: AuthState = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
