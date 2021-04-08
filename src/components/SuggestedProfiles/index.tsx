import React from 'react';

import SuggestedProfilesContainer from './styles';

const SuggestedProfiles: React.FC = () => (
  <SuggestedProfilesContainer>
    <h4>Sugestões para seguir</h4>
    <div className="suggested-profile-container">
      <div className="suggested-profile">
        <img
          src="https://wallpaperaccess.com/full/2213424.jpg"
          alt="Nome do usuário"
        />

        <div className="suggested-profile-info">
          <p className="limited-text">Example</p>
          <p className="limited-text">@example01</p>
        </div>
      </div>
      <button type="button">SEGUIR</button>
    </div>
  </SuggestedProfilesContainer>
);

export default SuggestedProfiles;
