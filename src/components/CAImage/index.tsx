import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import CAImageContainer from './styles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

interface CAImageProps {
  image: string;
  options?: {
    alt?: string;
    loading?: 'lazy' | 'eager';
    className?: string;
    height?: string | number;
  };
}

const CAImage: React.FC<CAImageProps> = ({ image, options }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  return (
    <>
      <CAImageContainer
        className={options.className}
        onClick={() => setIsImageFullScreen(true)}
        onKeyDown={() => setIsImageFullScreen(true)}
        onBlur={() => setIsImageFullScreen(false)}
        type="button"
      >
        <img
          src={image}
          alt={options.alt}
          loading={options.loading}
          height={options.height}
        />
      </CAImageContainer>
      {isImageFullScreen && (
        <FullScreenImage
          img={image}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </>
  );
};

CAImage.defaultProps = {
  options: {
    alt: '',
    loading: 'eager',
    className: '',
    height: '',
  },
};

export default CAImage;
