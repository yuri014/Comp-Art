import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ImagePostContainer from './imagePostStyles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

interface ImagePostProps {
  image: string;
  imageHeight: string;
  alt: string;
}

const ImagePost: React.FC<ImagePostProps> = ({ alt, image, imageHeight }) => {
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
          alt={alt || 'Publicação'}
          height={imageHeight}
          effect="blur"
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
