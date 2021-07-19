import React, { useContext, useRef, useState } from 'react';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';

import formatTime from '@utils/formatTime';
import { ArtistPostProps } from '@interfaces/Post';
import ThemeContext from '@context/theme';
import { Tooltip } from '@material-ui/core';
import AudioPostContainer from './audioPostStyles';
import Links from './Links';
import AudioSlider from './Slider';

const AudioPost: React.FC<ArtistPostProps> = ({ isShare, post }) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('00:00');
  const { isDarkMode } = useContext(ThemeContext);

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
      isLightTheme={!isDarkMode}
    >
      <div className="audio-card">
        <figure className="thumbnail">
          <Image
            src={post.thumbnail || '/assets/audio-placeholder.svg'}
            alt={post.alt}
            width="200px"
            height="200px"
            layout="intrinsic"
          />
        </figure>
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
            <Tooltip title="Voltar 10 segundos" placement="top" arrow>
              <IconButton
                onClick={() => {
                  audioRef.current.currentTime -= 10;
                }}
                aria-label="voltar 10 segundos"
              >
                <FaBackward />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={!isPlaying ? 'Play' : 'Pause'}
              placement="top"
              arrow
            >
              <IconButton
                onClick={() => handlePlaying()}
                aria-label={!isPlaying ? 'Play' : 'Pause'}
              >
                {!isPlaying ? <FaPlay /> : <FaPause />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Avançar 10 segundos" placement="top" arrow>
              <IconButton
                onClick={() => {
                  audioRef.current.currentTime += 10;
                }}
                aria-label="avançar 10 segundos"
              >
                <FaForward />
              </IconButton>
            </Tooltip>
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
              src={post.body}
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
