import React from 'react';
import { CircularProgress } from '@material-ui/core';

import DescriptionCounterContainer from './styles';

type Answer = string | number;

interface DescriptionCounterProps {
  progress: number;
  charCounterWithoutSpace: number;
  className?: string;
}

const DescriptionCounter: React.FC<DescriptionCounterProps> = ({
  progress,
  className,
  charCounterWithoutSpace,
}) => {
  const checkProgress = (answerOne: Answer, anwserTwo: Answer) => {
    if (progress >= 100) {
      return answerOne;
    }
    return anwserTwo;
  };

  return (
    <DescriptionCounterContainer className={className}>
      <p
        className={`${
          charCounterWithoutSpace <= 1200 ? 'counter' : 'counter-limit'
        }`}
      >
        {charCounterWithoutSpace}
      </p>
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
