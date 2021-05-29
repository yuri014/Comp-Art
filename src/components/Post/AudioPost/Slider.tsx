import { Slider } from '@material-ui/core';
import formatTime from '@utils/formatTime';
import React, { useCallback, useEffect, useState } from 'react';

interface AudioSliderProps {
  audioDuration: string;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioSlider: React.FC<AudioSliderProps> = ({
  audioDuration,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [slider, setSlider] = useState(0);

  const setTime = useCallback(() => {
    const time = audioRef.current.currentTime;
    const { minutes, seconds } = formatTime(time);
    setCurrentTime(`${minutes}:${seconds}`);
    return time;
  }, [audioRef]);

  const handleScroll = (_, newValue: number | number[]) => {
    // eslint-disable-next-line no-param-reassign
    audioRef.current.currentTime = newValue as number;
    setSlider(newValue as number);
    setTime();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const current = setTime();
      setSlider(audioRef.current.currentTime);
      if (current === audioRef.current.duration) {
        setIsPlaying(false);
      }
    }, 20);

    if (!isPlaying) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [audioRef, isPlaying, setIsPlaying, setTime]);

  useEffect(() => {
    if (audioRef.current.duration) {
      setTime();
    }
  }, [audioRef, setTime]);

  return (
    <div className="progress">
      <Slider
        value={slider}
        min={0}
        max={audioRef.current && audioRef.current.duration}
        onChange={handleScroll}
        aria-label="Slider"
        step={0.01}
        className="prevent-redirect-post"
      />
      <div className="duration">
        <p>{currentTime || '00:00'}</p>
        <p>{audioDuration || '00:00'}</p>
      </div>
    </div>
  );
};

export default AudioSlider;
