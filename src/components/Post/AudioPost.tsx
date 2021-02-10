/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import {
  FaBackward,
  FaForward,
  FaHeart,
  FaPause,
  FaPlay,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import { Slider, ThemeProvider } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { AudioPostContainer } from './styles';
import mainTheme from '../../styles/themes/MainTheme';
import { PostProps } from '../../interfaces/Post';
import { DISLIKE_POST, LIKE_POST } from '../../graphql/mutations/post';
import OptionsMenu from './OptionsMenu';

interface LinksProps {
  username: string;
  description: string;
  name: string;
}

const Links = React.memo<LinksProps>(({ username, description, name }) => (
  <Link href={`profile/${username}`}>
    <a>
      <p className="music-name">{description}</p>
      <p className="artist-name">{name}</p>
    </a>
  </Link>
));

interface InteractionsProps {
  name: string;
  avatar: string;
  isLiked: boolean;
  dislikePost: () => void;
  likePost: () => void;
}

const Interactions = React.memo<InteractionsProps>(
  ({ avatar, dislikePost, isLiked, likePost, name }) => (
    <div role="button" tabIndex={0} className="image">
      <img alt={`Imagem de perfil de ${name}`} src={avatar || '/profile.jpg'} />
      <div className="interactions">
        <div>
          <IconButton
            title="Curtir"
            onClick={() => (isLiked ? dislikePost() : likePost())}
          >
            <span>{isLiked ? <FaHeart /> : <FaRegHeart />}</span>
          </IconButton>
        </div>
        <div>
          <IconButton title="Comentar">
            <FaRegComment />
          </IconButton>
        </div>
        <div>
          <IconButton title="Compartilhar">
            <FaRegShareSquare />
          </IconButton>
        </div>
      </div>
    </div>
  ),
);

const AudioPost: React.FC<PostProps> = ({ post }) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [slider, setSlider] = useState(0);

  useEffect(() => {
    setLikesCount(post.likesCount);
    setIsLiked(post.isLiked);
  }, [post.isLiked, post.likesCount]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { id: post._id },
    onCompleted: () => {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    },
  });
  const [dislikePost] = useMutation(DISLIKE_POST, {
    variables: { id: post._id },
    onCompleted: () => {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    },
  });

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

  return (
    <AudioPostContainer>
      <ThemeProvider theme={mainTheme}>
        <div className="audio-card">
          <div className="audio-card-content">
            <div className="audio-card-info">
              <Links
                username={post.artist.username}
                description={post.description}
                name={post.artist.name}
              />
              <OptionsMenu username={post.artist.username} />
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
                aria-labelledby="audio-progress"
                step={0.01}
              />
            </div>
          </div>
          <Interactions
            avatar={post.avatar}
            dislikePost={dislikePost}
            isLiked={isLiked}
            likePost={likePost}
            name={post.artist.name}
          />
        </div>
        <audio
          style={{ display: 'none' }}
          ref={audioRef}
          src={post.body}
          onLoadedMetadata={() => {
            const { minutes, seconds } = getTime(audioRef.current.duration);
            setAudioDuration(`${minutes}:${seconds}`);
          }}
          controls
        />
      </ThemeProvider>
    </AudioPostContainer>
  );
};

export default React.memo(AudioPost);
