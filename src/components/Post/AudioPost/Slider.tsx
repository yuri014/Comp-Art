import React, { useCallback, useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';
import { Howl } from 'howler';
import formatTime from '../../../utils/formatTime';

interface AudioSliderProps {
  audio: Howl;
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
  const [audioDuration, setAudioDuration] = useState<string | number>('0:00');

  const setTime = useCallback(() => {
    const time = audio.seek();
    const { minutes, seconds } = formatTime(time as number);
    setCurrentTime(`${minutes}:${Math.floor(seconds)}`);
  }, [audio]);

  useEffect(() => {
    const duration = audio.duration();
    const { minutes, seconds } = formatTime(duration as number);
    setAudioDuration(`${minutes}:${Math.floor(seconds)}`);
  }, [audio, isPlaying]);

  useEffect(() => {
    setTime();
    setSlider(audio.seek() as number);
  }, [audio, setTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime();
      setSlider(audio.seek() as number);
    }, 24);

    if (!isPlaying) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [audio, isPlaying, setIsPlaying, setTime]);

  const handleScroll = (_, newValue: number | number[]) => {
    audio.seek(newValue as number);
    setSlider(newValue as number);
    setTime();
  };

  return (
    <div className="progress">
      <Slider
        value={slider}
        min={0}
        max={audio.duration()}
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
