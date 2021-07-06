import React from 'react';
import { useRouter } from 'next/router';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { FaUserAlt, FaMoon, FaSignOutAlt } from 'react-icons/fa';

import { ILoggedProfile } from '@interfaces/Profile';
import ProfileImage from '@components/ProfileImage';
import { MenuListIcon } from './styles';

interface ProfileMenuProps extends ILoggedProfile {
  isDarkMode: boolean;
  logout: () => void;
  toggleTheme: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isDarkMode,
  toggleTheme,
  getLoggedProfile,
  logout,
}) => {
  const { push } = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls="menu-header"
        aria-haspopup="true"
        aria-label="Abrir menu de configurações"
        onClick={handleClick}
        color="secondary"
      >
        <ProfileImage
          avatar={getLoggedProfile.avatar}
          alt="Foto do perfil"
          username={getLoggedProfile.owner}
          className="profile-image"
        />
      </IconButton>
      <Menu
        id="menu-header"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => push(`/profile/${getLoggedProfile.owner}`)}>
          <MenuListIcon>
            <FaUserAlt />
            <p>Meu Perfil</p>
          </MenuListIcon>
        </MenuItem>
        <MenuItem onClick={() => toggleTheme()}>
          <MenuListIcon>
            <FaMoon />
            <p>Modo {!isDarkMode ? 'Escuro' : 'Claro'}</p>
          </MenuListIcon>
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            push('/login');
          }}
        >
          <MenuListIcon>
            <FaSignOutAlt />
            <p>Sair</p>
          </MenuListIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
