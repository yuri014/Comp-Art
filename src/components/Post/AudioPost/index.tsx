import React, { useContext, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';

import formatTime from '@utils/formatTime';
import { ArtistPostProps } from '@interfaces/Post';
import ThemeContext from '@context/theme';
import AudioPostContainer from './audioPostStyles';
import Links from './Links';
import AudioSlider from './Slider';

const AudioPost: React.FC<ArtistPostProps> = ({ isShare, post }) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const { theme } = useContext(ThemeContext);

  const handlePlaying = () => {
    if (!isPlaying) {
      audioRef.current.play();
      return setIsPlaying(true);
    }
    audioRef.current.pause();
    return setIsPlaying(false);
  };

  return (
    <AudioPostContainer
      isShare={isShare}
      darkColor={post.darkColor}
      lightColor={post.lightColor}
      isLightTheme={theme === 'light'}
    >
      <div className="audio-card">
        <div className="thumbnail">
          <img
            src={process.env.NEXT_PUBLIC_API_HOST + post.thumbnail}
            alt={post.description}
          />
        </div>
        <div className="audio-card-content">
          <div className="audio-card-info">
            <Links
              username={post.artist.owner}
              title={post.title}
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
          <AudioSlider
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioDuration={audioDuration}
          />
          {post.body && (
            <audio
              style={{ display: 'none' }}
              ref={audioRef}
              src={process.env.NEXT_PUBLIC_API_HOST + post.body}
              onLoadedMetadata={() => {
                const { minutes, seconds } = formatTime(
                  audioRef.current.duration,
                );
                setAudioDuration(`${minutes}:${seconds}`);
              }}
              controls
            />
          )}
        </div>
      </div>
    </AudioPostContainer>
  );
};

export default React.memo(AudioPost);
