import React from 'react';
import Link from 'next/link';
import { FiInfo } from 'react-icons/fi';
import { FaRegCompass } from 'react-icons/fa';

import { EmptyPostContainer } from './styles';

const EmptyPost: React.FC = () => (
  <EmptyPostContainer>
    <FiInfo size={80} />
    <p>Não há posts por enquanto!</p>
    <p>Você ainda pode explorar para achar coisas que possam te inspirar!</p>
    <Link href="/explore">
      <a>
        <button type="button">
          Explorar&nbsp;
          <span>
            <FaRegCompass size={20} />
          </span>
        </button>
      </a>
    </Link>
  </EmptyPostContainer>
);

export default EmptyPost;
