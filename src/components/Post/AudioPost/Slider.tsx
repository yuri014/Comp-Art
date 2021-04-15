/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';

interface AudioSliderProps {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioSlider: React.FC<AudioSliderProps> = ({
  audio,
  isPlaying,
  setIsPlaying,
}) => {
  const [slider, setSlider] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [audioDuration, setAudioDuration] = useState('0:00');

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return { minutes, seconds };
  };

  const setTime = useCallback(() => {
    const time = audio.currentTime;
    const { minutes, seconds } = getTime(time);
    setCurrentTime(`${minutes}:${Math.floor(seconds)}`);
  }, [audio]);

  useEffect(() => {
    audio.onloadedmetadata = () => {
      const { minutes, seconds } = getTime(audio.duration);
      setAudioDuration(`${minutes}:${seconds}`);
    };
  }, [audio]);

  useEffect(() => {
    setTime();
    setSlider(audio.currentTime);
  }, [audio, setTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime();
      setSlider(audio.currentTime);
    }, 24);

    if (!isPlaying) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [audio, isPlaying, setIsPlaying, setTime]);

  const handleScroll = (_, newValue: number | number[]) => {
    audio.currentTime = newValue as number;
    setSlider(newValue as number);
    setTime();
  };

  return (
    <div className="progress">
      <Slider
        value={slider}
        min={0}
        max={audio && audio.duration}
        onChange={handleScroll}
        aria-label="input-slider"
        step={0.01}
      />
      <div className="duration">
        <p>{currentTime || '0:00'}</p>
        <p>{audioDuration || '0:00'}</p>
      </div>
    </div>
  );
};

export default AudioSlider;
