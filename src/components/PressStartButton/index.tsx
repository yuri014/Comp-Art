import React from 'react';
import { FaGamepad } from 'react-icons/fa';

import PressStartButtonContainer from './styles';

interface PressStartButtonProps {
  changeState?: () => void;
}

const PressStartButton: React.FC<PressStartButtonProps> = ({
  changeState,
  children,
}) => (
  <PressStartButtonContainer
    type="button"
    onClick={changeState}
    onKeyDown={changeState}
    className="press-start"
  >
    {children}
    <FaGamepad />
  </PressStartButtonContainer>
);

export default PressStartButton;
