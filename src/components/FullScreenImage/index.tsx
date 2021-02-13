import { IconButton } from '@material-ui/core';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

import FullScreenImageContainer from './styles';

const FullScreenImage: React.FC = () => (
  <FullScreenImageContainer>
    <div className="close">
      <IconButton aria-label="fechar imagem" color="secondary">
        <FaTimes size={24} />
      </IconButton>
    </div>
    <img src="/profile.jpg" alt="Perfil" />
  </FullScreenImageContainer>
);

export default FullScreenImage;
