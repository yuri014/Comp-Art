import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from 'react-icons/fa';
import { ThemeProvider } from '@material-ui/core';

import { FiRepeat } from 'react-icons/fi';
import AudioPostContainer from './audioPostStyles';
import { PostProps } from '../../../interfaces/Post';
import Links from './Links';
import ThemeContext from '../../../context/theme';
import mainDarkTheme from '../../../styles/themes/MainDarkTheme';
import mainLightTheme from '../../../styles/themes/MainLightTheme';
import AudioSlider from './Slider';

const AudioPost: React.FC<PostProps> = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const { theme } = useContext(ThemeContext);

  const handlePlaying = () => {
    if (!isPlaying) {
      audio.play();
      return setIsPlaying(true);
    }
    audio.pause();
    return setIsPlaying(false);
  };

  useEffect(() => {
    const newAudio = new Audio(process.env.NEXT_PUBLIC_API_HOST + post.body);
    setAudio(newAudio);

    newAudio.addEventListener('ended', () => setIsPlaying(false));

    return () =>
      newAudio.removeEventListener('ended', () => setIsPlaying(false));
  }, [post.body]);

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
                    audio.currentTime -= 10;
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
                    audio.currentTime += 10;
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
            {audio && (
              <AudioSlider
                audio={audio}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            )}
          </div>
        </div>
      </ThemeProvider>
    </AudioPostContainer>
  );
};

export default AudioPost;
