import React from 'react';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

import QuestsProgressContainer from './styles';

const QuestsProgress: React.FC = () => (
  <QuestsProgressContainer>
    <h5>Quests Atuais</h5>
    <div className="daily-quests">
      <h6>Quests Diária: </h6>
      <FaCheckSquare />
      <FaCheckSquare />
      <FaRegSquare />
    </div>
  </QuestsProgressContainer>
);

export default QuestsProgress;
