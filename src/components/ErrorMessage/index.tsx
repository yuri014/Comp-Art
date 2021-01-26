import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

import ErrorMessageContainer from './styles';

const ErrorMessage: React.FC = ({ children }) => (
  <ErrorMessageContainer>
    <FaExclamationCircle className="danger-icon" />
    &nbsp;&nbsp;
    <p>{children}</p>
  </ErrorMessageContainer>
);

export default ErrorMessage;
