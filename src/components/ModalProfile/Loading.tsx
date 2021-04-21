import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingProfileLikes: React.FC = () => (
  <>
    <div className="profile">
      <div className="loading">
        <Skeleton animation="wave" variant="circle" height={50} width={50} />
        <div className="profile-content">
          <div className="first-row">
            <Skeleton animation="wave" variant="text" height={20} width={100} />
          </div>
          <div className="second-row">
            <div className="bio">
              <Skeleton
                animation="wave"
                height={30}
                width={180}
                component="p"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default LoadingProfileLikes;
