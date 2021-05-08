import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from 'react-icons/fa';
import { Howl } from 'howler';

import { FiRepeat } from 'react-icons/fi';
import AudioPostContainer from './audioPostStyles';
import { PostProps } from '../../../interfaces/Post';
import Links from './Links';
import AudioSlider from './Slider';

const AudioPost: React.FC<PostProps> = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<Howl>();

  const handlePlaying = () => {
    if (!isPlaying) {
      audio.play();
      return setIsPlaying(true);
    }
    audio.pause();
    return setIsPlaying(false);
  };

  useEffect(() => {
    const newAudio = new Howl({
      src: [process.env.NEXT_PUBLIC_API_HOST + post.body],
      autoplay: false,
      html5: true,
      loop: false,
    });
    setAudio(newAudio);

    newAudio.once('end', () => setIsPlaying(false));
  }, [post.body]);

  const changeCurrentTime = (direction: 'forward' | 'backward') => {
    const currentSeek = audio.seek() as number;
    if (direction === 'forward') {
      const toTime = currentSeek + 10;
      const duration = audio.duration();
      if (toTime >= duration) {
        return;
      }
      audio.seek(toTime);
      audio.play();
    } else {
      const toTime = currentSeek - 10;
      if (toTime <= 0) {
        return;
      }
      audio.seek(toTime);
      audio.play();
    }
  };

  return (
    <AudioPostContainer darkColor={post.darkColor} lightColor={post.lightColor}>
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
              description={post.description}
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
                  changeCurrentTime('backward');
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
                  changeCurrentTime('forward');
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
          {audio && (
            <AudioSlider
              audio={audio}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
        </div>
      </div>
    </AudioPostContainer>
  );
};

export default React.memo(AudioPost);
