import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import CAImageContainer from './styles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

interface CAImageProps {
  className?: string;
  image: string;
}

const CAImage: React.FC<CAImageProps> = ({ className, image }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  return (
    <>
      <CAImageContainer
        className={className}
        onClick={() => setIsImageFullScreen(true)}
        onKeyDown={() => setIsImageFullScreen(true)}
        onBlur={() => setIsImageFullScreen(false)}
        type="button"
      >
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + image}
          alt="Imagem do perfil"
        />
      </CAImageContainer>
      {isImageFullScreen && (
        <FullScreenImage
          img={process.env.NEXT_PUBLIC_API_HOST + image}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </>
  );
};

CAImage.defaultProps = {
  className: '',
};

export default CAImage;
