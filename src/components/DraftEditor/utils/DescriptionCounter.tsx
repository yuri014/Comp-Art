import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { CharCounter } from './plugins';

type Answer = string | number;

interface DescriptionCounterProps {
  progress: number;
}

const DescriptionCounter: React.FC<DescriptionCounterProps> = ({
  progress,
}) => {
  const checkProgress = (answerOne: Answer, anwserTwo: Answer) => {
    if (progress >= 100) {
      return answerOne;
    }
    return anwserTwo;
  };

  return (
    <>
      <div className="counter-container">
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
      </div>
    </>
  );
};

export default DescriptionCounter;
