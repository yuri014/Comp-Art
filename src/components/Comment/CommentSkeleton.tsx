import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { CommentContainer } from './styles';

const CommentSkeleton: React.FC = () => (
  <CommentContainer>
    <div className="author-image">
      <Skeleton animation="wave" variant="circle" width={30} height={30} />
    </div>
    <Skeleton
      animation="wave"
      variant="rect"
      width="100%"
      height={60}
      style={{ borderRadius: '5px' }}
    />
  </CommentContainer>
);

export default CommentSkeleton;
