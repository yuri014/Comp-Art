import React from 'react';
import { FaCheck } from 'react-icons/fa';

import QuestsProgressContainer from './styles';

const QuestsProgress: React.FC = () => (
  <QuestsProgressContainer>
    <h5>Quests atuais</h5>
    <div className="quest-container">
      <div>
        <div className="quest-icon-complete">
          <FaCheck />
        </div>
        <p>Adicionar foto de perfil</p>
      </div>
      <p>+10xp</p>
    </div>
    <div className="quest-container">
      <div>
        <div className="quest-icon-complete">
          <FaCheck />
        </div>
        <p>Adicionar foto de perfil</p>
      </div>
      <p>+10xp</p>
    </div>
  </QuestsProgressContainer>
);

export default QuestsProgress;
