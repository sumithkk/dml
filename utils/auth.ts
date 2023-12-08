// utils/auth.ts
export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      return !!storedToken;
    }
    return false; // On the server side, assume not authenticated
  };