import React from 'react';
import Link from 'next/link';
import { FaRegCompass } from 'react-icons/fa';

import NoPostIcon from '../../assets/no-posts.svg';
import { EmptyPostContainer } from './utilsStyles';

const EmptyPost: React.FC = () => (
  <EmptyPostContainer>
    <p className="empty-post-title">Não há postagens por enquanto!</p>
    <NoPostIcon />
    <p>Venha explorar novas artes antes de publicar as suas</p>
    <Link href="/explore">
      <a>
        <button type="button">
          EXPLORAR
          <div>
            <FaRegCompass />
          </div>
        </button>
      </a>
    </Link>
  </EmptyPostContainer>
);

export default EmptyPost;
