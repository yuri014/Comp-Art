import React from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

const ErrorRequest: React.FC = () => {
  const router = useRouter();
  if (Cookie.get('jwtToken')) {
    router.push('/register-profile');
    return <p>error</p>;
  }
  return <p>error</p>;
};

export default ErrorRequest;
