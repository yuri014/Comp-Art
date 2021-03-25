import React from 'react';

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
  </PressStartButtonContainer>
);

export default PressStartButton;
