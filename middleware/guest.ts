import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parse } from 'cookie';
import Cookies from 'js-cookie';

export const guestMiddleware = (
  handler: (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<any>>
) => async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
  let loggedIn = false;

  if (typeof window !== 'undefined') {
    const storedToken = Cookies.get('token');
    loggedIn = !!storedToken;
  } else {
    const cookies = context.req.headers.cookie || '';
    const { token } = parse(cookies);
    loggedIn = !!token;
  }

  if (loggedIn) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return handler(context);
};