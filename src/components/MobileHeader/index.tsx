import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import Image from 'next/image';
import Skeleton from '@material-ui/lab/Skeleton';
import { SwipeableDrawer, ThemeProvider } from '@material-ui/core';

import MobileHeaderContainer from './styles';
import { ILoggedProfile } from '../../interfaces/Profile';
import mainTheme from '../../styles/themes/MainTheme';
import HomeProfile from '../HomeProfile';

interface MobileHeaderProps extends ILoggedProfile {
  loading: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  getLoggedProfile,
  loading,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <MobileHeaderContainer>
      <nav className={visible ? '' : 'hide'}>
        <ThemeProvider theme={mainTheme}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={24}
              height={24}
            />
          ) : (
            <div className="profile">
              <Image
                src={getLoggedProfile.avatar || '/profile.jpg'}
                alt="Imagem do perfil"
                width={500}
                height={500}
                onClick={() => setIsDrawerOpen(true)}
              />
            </div>
          )}
          <Link href="/home">
            <a>
              <h1>COMP-ART</h1>
            </a>
          </Link>
          <Link href="/config">
            <a>
              <FaCog />
            </a>
          </Link>
          <SwipeableDrawer
            onClose={() => setIsDrawerOpen(false)}
            onOpen={() => setIsDrawerOpen(true)}
            open={isDrawerOpen}
          >
            <HomeProfile getLoggedProfile={getLoggedProfile} />
          </SwipeableDrawer>
        </ThemeProvider>
      </nav>
    </MobileHeaderContainer>
  );
};

export default MobileHeader;
