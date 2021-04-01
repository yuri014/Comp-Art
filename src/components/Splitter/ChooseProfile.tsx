import React from 'react';

interface ChooseProfileProps {
  isArtist: boolean;
  setIsArtist: (_args: boolean) => void;
}

const ChooseProfile: React.FC<ChooseProfileProps> = ({
  isArtist,
  setIsArtist,
}) => (
  <div className="choose-profile">
    <button
      onClick={() => setIsArtist(true)}
      type="button"
      className={isArtist ? 'active' : ''}
    >
      <img src="/assets/avatar-artist.svg" alt="Representação de um artista" />
      <p>Cadastrar como Artista</p>
    </button>
    <button
      type="button"
      onClick={() => setIsArtist(false)}
      className={!isArtist ? 'active' : ''}
    >
      <img src="/assets/avatar-user.svg" alt="Representação de um fã" />
      <p>Cadastrar como Fã</p>
    </button>
  </div>
);

export default ChooseProfile;
