import React from 'react';
import { LinearProgress } from '@material-ui/core';

import ProgressBarContainer from './styles';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <ProgressBarContainer>
    <LinearProgress variant="determinate" value={value} />
    <p>{value}%</p>
  </ProgressBarContainer>
);

export default ProgressBar;
