import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ImagePostContainer from './imagePostStyles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

interface ImagePostProps {
  image: string;
  imageHeight: string;
}

const ImagePost: React.FC<ImagePostProps> = ({ image, imageHeight }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [resizeImage, setResizeImage] = useState('');

  useEffect(() => {
    setResizeImage(imageHeight);
  }, [imageHeight]);

  return (
    <ImagePostContainer>
      <button
        onClick={() => setIsImageFullScreen(true)}
        onBlur={() => setIsImageFullScreen(false)}
        type="button"
        className="image-button"
        style={{ height: resizeImage }}
      >
        <LazyLoadImage
          className="prevent-redirect-post post-image"
          src={image}
          alt="Publicação"
          height={imageHeight}
          effect="opacity"
          afterLoad={() => setResizeImage('auto')}
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
