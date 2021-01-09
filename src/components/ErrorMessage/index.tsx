import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

import ErrorMessageContainer from './styles';

const ErrorMessage: React.FC = ({ children }) => (
  <ErrorMessageContainer>
    <FaExclamationCircle />
    &nbsp;&nbsp;&nbsp;&nbsp;{children}
  </ErrorMessageContainer>
);

export default ErrorMessage;
