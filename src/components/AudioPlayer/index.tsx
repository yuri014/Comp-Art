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

    wavesurfer.current.load(process.env.NEXT_PUBLIC_API_HOST + audio);

    wavesurfer.current.on('ready', () => {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(0.5);
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
      <img src={process.env.NEXT_PUBLIC_API_HOST + thumbnail} alt="" />
      <strong>{title}</strong>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <div className="buttons">
          <button aria-label="voltar 10 segundos" type="button">
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
          <button aria-label="avançar 10 segundos" type="button">
            <FaForward />
          </button>
        </div>
      </div>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
