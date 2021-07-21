import { initializeApollo } from '@graphql/apollo/config';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { IncomingMessage } from 'http';
import { GetServerSidePropsResult } from 'next';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

type IRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const getLoggedUserWithAuth = async (
  req: IRequest,
): Promise<GetServerSidePropsResult<{ [key: string]: unknown }>> => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const client = initializeApollo(null, jwtToken);

  const getProfile = await client.query({
    query: GET_LOGGED_PROFILE,
    errorPolicy: 'ignore',
  });

  if (jwtToken && !getProfile.data) {
    return {
      redirect: {
        destination: '/register-profile',
        permanent: false,
      },
    };
  }

  const { getLoggedProfile } = getProfile.data;

  return {
    props: { getLoggedProfile, jwtToken },
  };
};

export default getLoggedUserWithAuth;
