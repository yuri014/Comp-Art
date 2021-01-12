import React from 'react';
import { FaGamepad } from 'react-icons/fa';

import PressStartButtonContainer from './styles';

interface PressStartButtonProps {
  changeState?: () => void;
  type?: 'submit' | 'reset';
}

const PressStartButton: React.FC<PressStartButtonProps> = ({
  changeState,
  children,
  type,
}) => (
  <PressStartButtonContainer
    type={type || 'button'}
    onClick={changeState}
    onKeyDown={changeState}
    className="press-start"
  >
    {children}
    <FaGamepad />
  </PressStartButtonContainer>
);

export default PressStartButton;
