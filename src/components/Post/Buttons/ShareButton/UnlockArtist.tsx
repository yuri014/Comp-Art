import Lottie, { LottieRef } from 'lottie-react';
import React, { useEffect, useRef } from 'react';

import * as animationData from '../../../../animations/unlock.json';
import { UnlockArtistContainer } from './styles';

interface UnlockArtistProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnlockArtist: React.FC<UnlockArtistProps> = ({ setShowModal }) => {
  const lottieRef: LottieRef = useRef();

  // Espera a animação do modal
  useEffect(() => {
    setTimeout(() => {
      lottieRef.current.play();
    }, 7000);
  }, [lottieRef]);

  return (
    <UnlockArtistContainer>
      <Lottie
        autoPlay={false}
        loop={false}
        animationData={animationData}
        onComplete={() => setShowModal(false)}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        lottieRef={lottieRef}
      />
    </UnlockArtistContainer>
  );
};

export default UnlockArtist;
