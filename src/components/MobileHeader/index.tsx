import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import Image from 'next/image';
import { SwipeableDrawer, ThemeProvider } from '@material-ui/core';

import MobileHeaderContainer from './styles';
import { ILoggedProfile } from '../../interfaces/Profile';
import mainTheme from '../../styles/themes/MainTheme';
import HomeProfile from '../HomeProfile';

const MobileHeader: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Este useEffect é para prevenir vazamento de memória
  useEffect(() => {
    setIsMount(true);
    return () => {
      setIsMount(false);
    };
  }, []);

  return (
    <MobileHeaderContainer>
      <nav className={visible ? '' : 'hide'}>
        <ThemeProvider theme={mainTheme}>
          <div className="profile">
            <Image
              src={process.env.NEXT_PUBLIC_API_HOST + getLoggedProfile.avatar}
              alt="Imagem do perfil"
              width={500}
              height={500}
              onClick={() => setIsDrawerOpen(true)}
            />
          </div>
          <Link href="/home">
            <a>
              <p>COMP-ART</p>
            </a>
          </Link>
          <Link href="/config">
            <a>
              <FaCog />
            </a>
          </Link>
          {isMount && (
            <SwipeableDrawer
              anchor="left"
              onClose={() => setIsDrawerOpen(false)}
              onOpen={() => setIsDrawerOpen(true)}
              open={isDrawerOpen}
            >
              <HomeProfile getLoggedProfile={getLoggedProfile} />
            </SwipeableDrawer>
          )}
        </ThemeProvider>
      </nav>
    </MobileHeaderContainer>
  );
};

export default MobileHeader;
