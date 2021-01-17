import React from 'react';
import { useRouter } from 'next/router';

const ErrorRequest: React.FC = () => {
  const router = useRouter();
  if (localStorage.getItem('jwtToken')) {
    router.push('/register-profile');
    return <p>error</p>;
  }
  return <p>error</p>;
};

export default ErrorRequest;
