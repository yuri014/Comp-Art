import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  FaBackward,
  FaForward,
  FaPlay,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import { LinearProgress, ThemeProvider } from '@material-ui/core';

import { AudioPostContainer } from './styles';
import mainTheme from '../../styles/themes/MainTheme';

const AudioPost: React.FC = () => (
  <AudioPostContainer>
    <ThemeProvider theme={mainTheme}>
      <div className="audio-card">
        <div className="audio-card-info">
          <div>
            <p className="music-name">On Avery Island</p>
            <p className="artist-name">Neutral Milk Hotel</p>
          </div>
          <div className="audio-buttons">
            <IconButton aria-label="previous">
              <FaBackward />
            </IconButton>
            <IconButton aria-label="play/pause">
              <FaPlay />
            </IconButton>
            <IconButton aria-label="next">
              <FaForward />
            </IconButton>
          </div>
          <div className="progress">
            <div className="duration">
              <p>0:00</p>
              <p>3:15</p>
            </div>
            <LinearProgress variant="determinate" value={60} />
          </div>
        </div>
        <div role="button" tabIndex={0} className="image">
          <img
            alt="asd"
            src="https://www.firerecords.com/wp/wp-content/uploads/2016/02/Neutral-Milk-Hotel-On-Avery-Island-2011-v2.jpg"
          />
          <div className="interactions">
            <span>
              <FaRegHeart />
            </span>
            <span>
              <FaRegComment />
            </span>
            <span>
              <FaRegShareSquare />
            </span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  </AudioPostContainer>
);

export default AudioPost;
