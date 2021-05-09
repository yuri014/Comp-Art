import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ImagePostContainer from './imagePostStyles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

const ImagePost: React.FC<{ image: string }> = ({ image }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  return (
    <ImagePostContainer>
      <button
        onClick={() => setIsImageFullScreen(true)}
        onBlur={() => setIsImageFullScreen(false)}
        type="button"
        className="image-button"
      >
        <figure className="post-image">
          <img
            className="not-post-redirect"
            src={process.env.NEXT_PUBLIC_API_HOST + image}
            alt="Publicação"
          />
        </figure>
      </button>
      {isImageFullScreen && (
        <FullScreenImage
          img={process.env.NEXT_PUBLIC_API_HOST + image}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </ImagePostContainer>
  );
};

export default ImagePost;
