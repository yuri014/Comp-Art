import React from 'react';
import Link from 'next/link';
import { FaBell, FaHome, FaScroll, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';

import MobileFooterContainer from './styles';

const MobileFooter: React.FC = () => {
  const routes = useRouter();

  const activeLink = (link: string) =>
    routes.pathname === link && 'active-footer-link';

  return (
    <MobileFooterContainer>
      <Link href="/home">
        <a className={activeLink('/home')}>
          <FaHome />
        </a>
      </Link>
      <Link href="/search">
        <a className={activeLink('/search')}>
          <FaSearch />
        </a>
      </Link>
      <Link href="/notifications">
        <a className={activeLink('/notifications')}>
          <FaBell />
        </a>
      </Link>
      <Link href="/quests">
        <a className={activeLink('/quests')}>
          <FaScroll />
        </a>
      </Link>
    </MobileFooterContainer>
  );
};

export default MobileFooter;
