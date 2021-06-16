import React, { useContext } from 'react';
import { Skeleton } from '@material-ui/lab';
import { LinearProgress } from '@material-ui/core';

import { LevelContext } from '@context/level';

const LevelProgress: React.FC = () => {
  const context = useContext(LevelContext);

  return (
    <div className="profile-reputation">
      {context && context.level ? (
        <>
          <div className="xp">
            <div className="level">
              <p>Level:</p>
              <span>{context.level.getLoggedProfile.level}</span>
            </div>
            <p>{context.level.getLoggedProfile.xp}%</p>
          </div>
          <LinearProgress
            variant="determinate"
            value={context.level.getLoggedProfile.xp}
          />
        </>
      ) : (
        <Skeleton animation="wave" variant="rect" width="100%" height={20} />
      )}
    </div>
  );
};

export default LevelProgress;
