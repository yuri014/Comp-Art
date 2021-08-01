import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image, { ImageProps } from 'next/image';
import CAImageContainer from './styles';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));

type Props = {
  classNameContainer?: string;
};

type CAImageProps = Props & ImageProps;

const CAImage: React.FC<CAImageProps> = props => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  return (
    <>
      <CAImageContainer
        className={props.classNameContainer}
        onClick={() => setIsImageFullScreen(true)}
        onKeyDown={() => setIsImageFullScreen(true)}
        onBlur={() => setIsImageFullScreen(false)}
        type="button"
        data-testid="ca-image-button"
      >
        <Image {...props} />
      </CAImageContainer>
      {isImageFullScreen && (
        <FullScreenImage
          img={props.src as string}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </>
  );
};

export default CAImage;
