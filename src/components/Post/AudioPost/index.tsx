import React, { useContext, useEffect, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { Slider, ThemeProvider } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useLazyQuery } from '@apollo/client';

import { AudioPostContainer } from '../styles';
import mainTheme from '../../../styles/themes/MainTheme';
import { PostProps } from '../../../interfaces/Post';
import useDeletePost from '../../../hooks/posts';
import LevelContext from '../../../context/level';
import useInfiniteScroll from '../../../hooks/infiniteScroll';
import { IProfile } from '../../../interfaces/Profile';
import { GET_LIKES } from '../../../graphql/mutations/post';
import Interactions from './Interactions';
import Links from './Links';

const OptionsMenu = dynamic(() => import('../OptionsMenu'));
const ModalProfile = dynamic(() => import('../../ModalProfile'));

interface IGetProfileLikes {
  getLikes: Array<IProfile>;
}

const AudioPost: React.FC<PostProps> = ({ post }) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [slider, setSlider] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const levelContext = useContext(LevelContext);

  useEffect(() => {
    setLikesCount(post.likesCount);
    setIsLiked(post.isLiked);
  }, [post.isLiked, post.likesCount]);

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

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return { minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const current = audioRef.current.currentTime;
      const { minutes, seconds } = getTime(current);
      setCurrentTime(`${minutes}:${Math.floor(seconds)}`);
      setSlider(audioRef.current.currentTime);
      if (current === audioRef.current.duration) {
        setIsPlaying(false);
      }
    }, 20);

    if (!isPlaying) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlaying = () => {
    if (!isPlaying) {
      audioRef.current.play();
      return setIsPlaying(true);
    }
    audioRef.current.pause();
    return setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current.duration) {
      const { minutes, seconds } = getTime(audioRef.current.duration);
      setAudioDuration(`${minutes}:${seconds}`);
    }
  }, []);

  const handleScroll = (_, newValue: number | number[]) => {
    audioRef.current.currentTime = newValue as number;
    setSlider(newValue as number);
  };

  // * Get profiles likes

  const [isLoading, setIsLoading] = useState(true);

  const [
    getProfilesLikes,
    { data: profilesLikes, client, fetchMore },
  ] = useLazyQuery<IGetProfileLikes>(GET_LIKES, {
    variables: { id: post._id, offset: 0 },
    onCompleted: () => {
      setIsLoading(false);
    },
  });

  const lastPostRefLikes = useInfiniteScroll(
    profilesLikes,
    () =>
      !!profilesLikes.getLikes &&
      fetchMore({
        variables: { offset: profilesLikes.getLikes.length },
      }).then(newProfiles => {
        if (newProfiles.data.getLikes.length < 3) {
          client.cache.evict({ fieldName: 'getLikes' });
        }

        return newProfiles.data.getLikes.length < 3;
      }),
  );

  return (
    <>
      {!isDeleted && (
        <AudioPostContainer>
          <ThemeProvider theme={mainTheme}>
            <div className="audio-card">
              <div className="audio-card-content">
                <div className="audio-card-info">
                  <Links
                    username={post.artist.owner}
                    description={post.description}
                    name={post.artist.name}
                    id={post._id}
                  />
                  <div className="options">
                    <OptionsMenu
                      deletePost={handleDeletePost}
                      id={post._id}
                      username={post.artist.owner}
                    />
                  </div>
                </div>
                <div className="audio-buttons">
                  <IconButton
                    onClick={() => {
                      audioRef.current.currentTime -= 10;
                    }}
                    aria-label="previous"
                  >
                    <FaBackward />
                  </IconButton>
                  <IconButton
                    onClick={() => handlePlaying()}
                    aria-label="play/pause"
                  >
                    {!isPlaying ? <FaPlay /> : <FaPause />}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      audioRef.current.currentTime += 10;
                    }}
                    aria-label="next"
                  >
                    <FaForward />
                  </IconButton>
                </div>
                <div className="progress">
                  <div className="duration">
                    <p>{currentTime || '0:00'}</p>
                    <p>{audioDuration || '0:00'}</p>
                  </div>
                  <Slider
                    value={slider}
                    min={0}
                    max={audioRef.current && audioRef.current.duration}
                    onChange={handleScroll}
                    aria-label="input-slider"
                    step={0.01}
                  />
                </div>
              </div>
              <Interactions
                avatar={post.artist.avatar}
                dislikePost={dislikePost}
                isLiked={isLiked}
                likePost={likePost}
                name={post.artist.name}
                id={post._id}
              />
            </div>
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
                        src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
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
            <audio
              style={{ display: 'none' }}
              ref={audioRef}
              src={process.env.NEXT_PUBLIC_API_HOST + post.body}
              onLoadedMetadata={() => {
                const { minutes, seconds } = getTime(audioRef.current.duration);
                setAudioDuration(`${minutes}:${seconds}`);
              }}
              controls
            />
          </ThemeProvider>
        </AudioPostContainer>
      )}
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          lastPostRef={lastPostRefLikes}
          queryResult={{ data: { ...profilesLikes }, result: 'getLikes' }}
          isLoading={isLoading}
          getProfiles={getProfilesLikes}
        />
      )}
    </>
  );
};

export default React.memo(AudioPost);
