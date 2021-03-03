import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingProfileLikes: React.FC = () => (
  <>
    <div className="profile">
      <Skeleton animation="wave" variant="circle" height={50} width={50} />
      <div className="profile-content">
        <div className="profile-info">
          <Skeleton animation="wave" variant="text" height={20} width={120} />
        </div>
        <Skeleton className="bio" animation="wave" height={40} width={600} />
      </div>
    </div>
  </>
);

export default LoadingProfileLikes;
