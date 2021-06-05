import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';

const getLoggedUserWithNoAuth = async (
  jwtToken: string,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<unknown> => {
  const loggedProfile = await client.query({
    query: GET_LOGGED_PROFILE,
    errorPolicy: 'ignore',
  });

  if (jwtToken && !loggedProfile.data) {
    return {
      redirect: {
        destination: '/register-profile',
        permanent: false,
      },
    };
  }

  return loggedProfile.data && loggedProfile.data.getLoggedProfile;
};

export default getLoggedUserWithNoAuth;
