import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingSuggestedProfile: React.FC = () => (
  <div className="suggested-profile-container">
    <div className="suggested-profile">
      <Skeleton variant="circle" animation="wave" width={40} height={40} />
      <div className="suggested-profile-info">
        <Skeleton animation="wave" variant="text" width={140} height={20} />
        <Skeleton animation="wave" variant="text" width={80} height={15} />
      </div>
    </div>
  </div>
);

export default LoadingSuggestedProfile;
