import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js';

import CAImage from '@components/CAImage';
import AudioButtons from '@components/Post/Buttons/AudioButtons';
import { Tooltip } from '@material-ui/core';
import formWaveSurferOptions, { Colors } from './options';
import AudioPlayerContainer from './styles';

interface AudioPlayerProps extends Colors {
  audio: string;
  thumbnail: string;
  title: string;
  blurDataUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audio,
  blurDataUrl,
  darkColor,
  lightColor,
  thumbnail,
  title,
}) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current, {
      darkColor,
      lightColor,
    });
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(audio);

    wavesurfer.current.on('ready', () => {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(1);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [audio, darkColor, lightColor]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  return (
    <AudioPlayerContainer>
      <figure>
        <CAImage
          alt="Capa da música"
          width="250px"
          height="250px"
          quality={100}
          blurDataURL={blurDataUrl}
          placeholder="blur"
          src={thumbnail}
        />
      </figure>
      <strong>{title}</strong>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <AudioButtons
          song={{
            cover: thumbnail,
            musicSrc: audio,
            name: title,
            singer: title,
          }}
        >
          <div className="audio-buttons">
            <Tooltip title="Voltar 10 segundos" arrow>
              <button
                aria-label="voltar 10 segundos"
                type="button"
                onClick={() => wavesurfer.current.skipBackward()}
              >
                <FaBackward />
              </button>
            </Tooltip>
            <Tooltip title={!isPlaying ? 'Play' : 'Pause'} arrow>
              <button
                aria-label={!isPlaying ? 'Play' : 'Pause'}
                type="button"
                className="play-button"
                onClick={() => handlePlayPause()}
              >
                {!isPlaying ? <FaPlay /> : <FaPause />}
              </button>
            </Tooltip>
            <Tooltip title="Avançar 10 segundos" arrow>
              <button
                aria-label="avançar 10 segundos"
                type="button"
                onClick={() => wavesurfer.current.skipForward()}
              >
                <FaForward />
              </button>
            </Tooltip>
          </div>
        </AudioButtons>
      </div>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
