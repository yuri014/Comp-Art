import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js';

import formWaveSurferOptions, { Colors } from './options';
import AudioPlayerContainer from './styles';

interface AudioPlayerProps extends Colors {
  audio: string;
  thumbnail: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audio,
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
      <img src={thumbnail} alt="" />
      <strong>{title}</strong>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <div className="buttons">
          <button
            aria-label="voltar 10 segundos"
            type="button"
            onClick={() => wavesurfer.current.skipBackward()}
          >
            <FaBackward />
          </button>
          <button
            aria-label={!isPlaying ? 'Play' : 'Pause'}
            type="button"
            className="play-button"
            onClick={() => handlePlayPause()}
          >
            {!isPlaying ? <FaPlay /> : <FaPause />}
          </button>
          <button
            aria-label="avançar 10 segundos"
            type="button"
            onClick={() => wavesurfer.current.skipForward()}
          >
            <FaForward />
          </button>
        </div>
      </div>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
