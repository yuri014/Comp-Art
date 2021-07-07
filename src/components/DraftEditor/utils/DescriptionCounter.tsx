import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { CharCounter } from './plugins';
import DescriptionCounterContainer from './styles';

type Answer = string | number;

interface DescriptionCounterProps {
  progress: number;
  className?: string;
}

const DescriptionCounter: React.FC<DescriptionCounterProps> = ({
  progress,
  className,
}) => {
  const checkProgress = (answerOne: Answer, anwserTwo: Answer) => {
    if (progress >= 100) {
      return answerOne;
    }
    return anwserTwo;
  };

  return (
    <DescriptionCounterContainer className={className}>
      <CharCounter limit={1200} />
      <CircularProgress
        className="background-circle"
        variant="determinate"
        size="2rem"
        style={{ color: '#ababab' }}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        size="2rem"
        style={{ color: `${checkProgress('#FF3838', '#1cc5b7')}` }}
        value={checkProgress(100, progress) as number}
      />
    </DescriptionCounterContainer>
  );
};

DescriptionCounter.defaultProps = {
  className: '',
};

export default DescriptionCounter;
