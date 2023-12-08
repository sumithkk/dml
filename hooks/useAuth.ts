// hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Check for the presence of the token
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to the login page if the token is not present
      router.push('/login');
    }
  }, []);

  return;
};

export default useAuth;