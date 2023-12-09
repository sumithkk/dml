import Cookies from 'js-cookie';

export const login = (token: string) => {
    return (dispatch: any) => {
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN' });
    };
  };
  
  export const logout = () => {
    return (dispatch: any) => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('token');
      Cookies.remove('token');
      dispatch({ type: 'LOGOUT' });
    };
  };