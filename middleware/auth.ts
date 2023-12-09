import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parse } from 'cookie';
import Cookies from 'js-cookie';

export const authMiddleware = (
  handler: (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<any>>
) => async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
  let loggedIn = false;
  if (typeof window !== 'undefined') {
    const storedToken = Cookies.get('token');
    context.req.headers.authorization = `Bearer ${storedToken || ''}`;
    loggedIn = !!storedToken;
  } else {
    const cookies = context.req.headers.cookie || '';
    const { token } = parse(cookies);
    context.req.headers.authorization = `Bearer ${token || ''}`;
    loggedIn = !!token;
  }
  if (!loggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return handler(context);
};
