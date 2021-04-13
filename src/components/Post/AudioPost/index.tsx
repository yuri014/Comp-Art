import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from 'react-icons/fa';
import { Slider, ThemeProvider } from '@material-ui/core';

import { FiRepeat } from 'react-icons/fi';
import AudioPostContainer from './audioPostStyles';
import { PostProps } from '../../../interfaces/Post';
import Links from './Links';
import ThemeContext from '../../../context/theme';
import mainDarkTheme from '../../../styles/themes/MainDarkTheme';
import mainLightTheme from '../../../styles/themes/MainLightTheme';

const AudioPost: React.FC<PostProps> = ({ post }) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('');
  const [slider, setSlider] = useState(0);
  const { theme } = useContext(ThemeContext);

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return { minutes, seconds };
  };

  const setTime = useCallback(() => {
    const time = audioRef.current.currentTime;
    const { minutes, seconds } = getTime(time);
    setCurrentTime(`${minutes}:${Math.floor(seconds)}`);
    return time;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = setTime();
      setSlider(audioRef.current.currentTime);
      if (current === audioRef.current.duration) {
        setIsPlaying(false);
      }
    }, 20);

    if (!isPlaying) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, setTime]);

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
      setTime();
    }
  }, [setTime]);

  const handleScroll = (_, newValue: number | number[]) => {
    audioRef.current.currentTime = newValue as number;
    setSlider(newValue as number);
    setTime();
  };

  return (
    <AudioPostContainer>
      <ThemeProvider theme={theme === 'light' ? mainLightTheme : mainDarkTheme}>
        <div className="audio-card">
          <div className="audio-card-content">
            <div className="audio-card-info">
              <Links
                username={post.artist.owner}
                description={post.description}
                name={post.artist.name}
                id={post._id}
              />
            </div>
            <div className="audio-buttons">
              <IconButton aria-label="volume">
                <FaVolumeUp />
              </IconButton>
              <div className="primary-audio-button">
                <IconButton
                  onClick={() => {
                    audioRef.current.currentTime -= 10;
                  }}
                  aria-label="voltar 10 segundos"
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
                  aria-label="avançar 10 segundos"
                >
                  <FaForward />
                </IconButton>
              </div>
              <IconButton aria-label="repetir">
                <FiRepeat className="secondary-button" />
              </IconButton>
            </div>
            <div className="progress">
              <Slider
                value={slider}
                min={0}
                max={audioRef.current && audioRef.current.duration}
                onChange={handleScroll}
                aria-label="input-slider"
                step={0.01}
              />
              <div className="duration">
                <p>{currentTime || '0:00'}</p>
                <p>{audioDuration || '0:00'}</p>
              </div>
            </div>
          </div>
        </div>
        {post.body && (
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
        )}
      </ThemeProvider>
    </AudioPostContainer>
  );
};

export default React.memo(AudioPost);
