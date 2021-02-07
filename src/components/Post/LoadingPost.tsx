import React from 'react';

import EmptyPost from './Empty';
import SkeletonPost from './SkeletonPost';

interface LoadingProps {
  loading: boolean;
}

const LoadingPost: React.FC<LoadingProps> = ({ loading }) => (
  <>{loading ? <SkeletonPost /> : <EmptyPost />}</>
);

export default LoadingPost;
