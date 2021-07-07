import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ImagePostContainer from './imagePostStyles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

interface ImagePostProps {
  image: string;
  imageHeight: string;
}

const ImagePost: React.FC<ImagePostProps> = ({ image, imageHeight }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  return (
    <ImagePostContainer>
      <button
        onClick={() => setIsImageFullScreen(true)}
        onBlur={() => setIsImageFullScreen(false)}
        type="button"
        className="image-button"
      >
        <img
          className="prevent-redirect-post post-image"
          src={image}
          alt="Publicação"
          height={imageHeight}
          loading="lazy"
        />
      </button>
      {isImageFullScreen && (
        <FullScreenImage
          img={image}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </ImagePostContainer>
  );
};

export default ImagePost;
