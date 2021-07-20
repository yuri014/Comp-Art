import React, { useContext, useRef, useState } from 'react';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { Tooltip } from '@material-ui/core';

import formatTime from '@utils/formatTime';
import { ArtistPostProps } from '@interfaces/Post';
import ThemeContext from '@context/theme';
import { IPlaylist } from '@components/PortalAudioPlayer';
import AudioPostContainer from './audioPostStyles';
import Links from './Links';
import AudioSlider from './Slider';
import AudioButtons from '../Buttons/AudioButtons';

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

  const song: IPlaylist = {
    cover: post.thumbnail || '/assets/audio-placeholder.svg',
    musicSrc: post.body,
    name: post.title,
    singer: post.artist.name,
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
            src={song.cover}
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
              title={song.name}
              name={song.singer}
              id={post._id}
            />
          </div>
          <AudioButtons song={song}>
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
          </AudioButtons>
          <AudioSlider
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioDuration={audioDuration}
          />
          {song.musicSrc && (
            <audio
              style={{ display: 'none' }}
              ref={audioRef}
              src={song.musicSrc}
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
