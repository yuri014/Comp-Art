import { IconButton } from '@material-ui/core';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

import FullScreenImageContainer from './styles';

interface FullScreenImageProps {
  onClose: () => void;
  img: string;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({ img, onClose }) => (
  <FullScreenImageContainer>
    <div className="close">
      <IconButton
        aria-label="fechar imagem"
        color="secondary"
        onClick={onClose}
      >
        <FaTimes size={24} />
      </IconButton>
    </div>
    <img src={img} alt="Perfil" />
  </FullScreenImageContainer>
);

export default FullScreenImage;
