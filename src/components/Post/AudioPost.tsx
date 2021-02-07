import React, { useEffect, useRef, useState } from 'react';
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
import { LinearProgress, ThemeProvider } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { AudioPostContainer } from './styles';
import mainTheme from '../../styles/themes/MainTheme';
import { PostProps } from '../../interfaces/Post';
import { DISLIKE_POST, LIKE_POST } from '../../graphql/mutations/post';

const AudioPost: React.FC<PostProps> = ({ post }) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('');
  const [progress, setProgress] = useState(0);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likePost] = useMutation(LIKE_POST, {
    // eslint-disable-next-line no-underscore-dangle
    variables: { id: post._id },
    onCompleted: () => {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    },
  });
  const [dislikePost] = useMutation(DISLIKE_POST, {
    // eslint-disable-next-line no-underscore-dangle
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

  const updateTime = () => {
    const current = audioRef.current.currentTime;
    const { minutes, seconds } = getTime(current);
    setCurrentTime(`${minutes}:${Math.floor(seconds)}`);
    const result = current / audioRef.current.duration;
    setProgress(result * 100);
    if (current === audioRef.current.duration) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 100);

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

  return (
    <AudioPostContainer>
      <ThemeProvider theme={mainTheme}>
        <div className="audio-card">
          <div className="audio-card-info">
            <div>
              <p className="music-name">{post.description}</p>
              <p className="artist-name">{post.artist.name}</p>
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
              <LinearProgress
                variant="determinate"
                value={Math.round(progress)}
              />
            </div>
          </div>
          <div role="button" tabIndex={0} className="image">
            <img
              alt={`Imagem de perfil de ${post.artist.name}`}
              src={post.avatar || '/profile.jpg'}
            />
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
        </div>
        <audio
          style={{ display: 'none' }}
          ref={audioRef}
          src={post.body}
          controls
        />
      </ThemeProvider>
    </AudioPostContainer>
  );
};

export default AudioPost;
