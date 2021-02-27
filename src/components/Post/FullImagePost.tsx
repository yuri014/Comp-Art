import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { FaHeart, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { PostProps } from '../../interfaces/Post';
import useDeletePost from '../../hooks/posts';
import { PostContainer } from './styles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));
const OptionsMenu = dynamic(() => import('./OptionsMenu'));

const FullImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
  }, [post.isLiked, post.likesCount]);

  const [deletePost, dislikePost, likePost] = useDeletePost(
    post._id,
    () => {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    },
    () => {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    },
  );

  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  return (
    <PostContainer className="full-post">
      <div className="post">
        <button
          type="button"
          onClick={() => setIsImageFullScreen(true)}
          onBlur={() => setIsImageFullScreen(false)}
          className="image-button"
        >
          <figure className="post-image">
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + post.body}
              alt="Publicação"
            />
          </figure>
        </button>
        <div className="post-author">
          <div className="author-info">
            <img
              alt={`Imagem de perfil de ${post.artist.name}`}
              src={process.env.NEXT_PUBLIC_API_HOST + post.artist.avatar}
            />
            <Link href={`/profile/${post.artist.owner}`}>
              <a>
                <div>
                  <p>{post.artist.name}</p>
                  <span>
                    <p>
                      {new Date(post.createdAt).toLocaleDateString('en-GB')}
                    </p>
                    <p>&nbsp;●&nbsp;</p>
                    <p>@{post.artist.owner}</p>
                  </span>
                </div>
              </a>
            </Link>
          </div>
          <div className="post-config">
            <OptionsMenu
              deletePost={deletePost}
              id={post._id}
              username={post.artist.owner}
            />
          </div>
        </div>
        <div className="post-description">
          <p>{post.description}</p>
        </div>
        <div className="post-interaction">
          <Button
            className={isLiked ? 'active' : ''}
            type="button"
            onClick={() => (isLiked ? dislikePost() : likePost())}
            title="Curtir"
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <p>{likesCount}</p>
          </Button>
          <Button title="Compartilhar" type="button">
            <FaRegShareSquare />
            <p>{post.sharedCount}</p>
          </Button>
        </div>
      </div>
      {isImageFullScreen && (
        <FullScreenImage
          img={process.env.NEXT_PUBLIC_API_HOST + post.body}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </PostContainer>
  );
};

export default React.memo(FullImagePost);
