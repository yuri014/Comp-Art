import React from 'react';

import NullPostContainer from './styled';
import NotFoundIcon from '../../../assets/not-found-post.svg';

const NullPost: React.FC = () => (
  <NullPostContainer className="prevent-redirect-post">
    <p>Esse post não existe mais.</p>
    <NotFoundIcon />
  </NullPostContainer>
);

export default NullPost;
