import React, { useContext, useEffect, useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import Link from 'next/link';
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';
import useDeletePost from '../../hooks/posts';
import LevelContext from '../../context/level';
import useGetProfileLikes from '../../hooks/getModalQuery';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));
const OptionsMenu = dynamic(() => import('./OptionsMenu'));
const ModalProfile = dynamic(() => import('../ModalProfile'));

const ImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
  }, [post.isLiked, post.likesCount]);

  const levelContext = useContext(LevelContext);

  const [deletePost, dislikePost, likePost] = useDeletePost(
    post._id,
    () => {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
      if (levelContext) {
        levelContext.updateLevel();
      }
    },
    () => {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
      if (levelContext) {
        levelContext.updateLevel();
      }
    },
  );

  const handleDeletePost = () => {
    deletePost();
    setIsDeleted(true);
  };

  const [
    isLoading,
    getProfilesLikes,
    lastPostRefLikes,
    profilesLikes,
  ] = useGetProfileLikes(post._id);

  return (
    <>
      {!isDeleted && (
        <PostContainer>
          <ThemeProvider theme={mainTheme}>
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
                        <p>@{post.artist.owner}</p>
                        <p>&nbsp;●&nbsp;</p>
                        <p>
                          {new Date(post.createdAt).toLocaleDateString('en-GB')}
                        </p>
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="post-config">
                <OptionsMenu
                  deletePost={handleDeletePost}
                  id={post._id}
                  username={post.artist.owner}
                />
              </div>
            </div>
            <div className="post">
              <div className="post-description">
                <p>{post.description}</p>
              </div>
              <button
                onClick={() => setIsImageFullScreen(true)}
                onBlur={() => setIsImageFullScreen(false)}
                type="button"
                className="image-button"
              >
                <figure className="post-image">
                  <img
                    src={process.env.NEXT_PUBLIC_API_HOST + post.body}
                    alt="Publicação"
                  />
                </figure>
              </button>
              <div className="post-counts">
                <button
                  onClick={() => setModalShow(true)}
                  type="button"
                  aria-label="Abrir modal de likes"
                >
                  <div className="likes-images">
                    {post.likes &&
                      post.likes.map(({ profile }) => (
                        <img
                          key={profile.owner}
                          src={
                            process.env.NEXT_PUBLIC_API_HOST + profile.avatar
                          }
                          alt={profile.owner}
                          title={profile.owner}
                        />
                      ))}
                  </div>
                  {likesCount > 0 && (
                    <>
                      {likesCount} {likesCount > 1 ? 'curtidas' : 'curtida'}
                    </>
                  )}
                </button>
              </div>
              <div className="post-interaction">
                <Button
                  className={isLiked ? 'active' : ''}
                  type="button"
                  onClick={() => (isLiked ? dislikePost() : likePost())}
                  title="Curtir"
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                </Button>
                <Link href={`/post/${post._id}`}>
                  <a>
                    <Button title="Comentar" type="button">
                      <FaRegComment />
                    </Button>
                  </a>
                </Link>
                <Button title="Compartilhar" type="button">
                  <FaRegShareSquare />
                </Button>
              </div>
            </div>
            {isImageFullScreen && (
              <FullScreenImage
                img={process.env.NEXT_PUBLIC_API_HOST + post.body}
                onClose={() => setIsImageFullScreen(false)}
              />
            )}
          </ThemeProvider>
        </PostContainer>
      )}
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          lastPostRef={lastPostRefLikes}
          isLoading={isLoading}
          queryResult={{ data: { ...profilesLikes }, result: 'getLikes' }}
          getProfiles={getProfilesLikes}
        />
      )}
    </>
  );
};

export default React.memo(ImagePost);
