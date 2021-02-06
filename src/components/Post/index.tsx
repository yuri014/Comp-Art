import React from 'react';
import { PostProps } from '../../interfaces/Post';
import AudioPost from './AudioPost';
import ImagePost from './ImagePost';

const Post: React.FC<PostProps> = ({ post }) => (
  <>{post.isAudio ? <AudioPost post={post} /> : <ImagePost post={post} />}</>
);

export default Post;
