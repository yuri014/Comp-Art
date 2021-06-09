import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import AudioPlayerContainer from './styles';

interface Colors {
  lightColor: string;
  darkColor: string;
}

interface AudioPlayerProps extends Colors {
  audio: string;
  thumbnail: string;
}

const formWaveSurferOptions = (
  ref: React.MutableRefObject<HTMLDivElement>,
  colors: Colors,
): WaveSurferParams => ({
  container: (ref as unknown) as HTMLDivElement,
  waveColor: colors.lightColor,
  progressColor: colors.darkColor,
  cursorColor: colors.darkColor,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 40,
  normalize: true,
  partialRender: true,
  xhr: {
    credentials: 'same-origin',
    withCredentials: true,
    mode: 'cors',
  },
});

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audio,
  darkColor,
  lightColor,
  thumbnail,
}) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

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

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <AudioPlayerContainer>
      <img src={process.env.NEXT_PUBLIC_API_HOST + thumbnail} alt="" />
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
        <input
          type="range"
          id="volume"
          name="volume"
          min="0.01"
          max="1"
          step=".025"
          onChange={e => onVolumeChange(e)}
          defaultValue={volume}
          className="slider"
        />
      </div>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
