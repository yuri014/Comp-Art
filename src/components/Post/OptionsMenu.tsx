import React, { useContext, useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  NoSsr,
  ThemeProvider,
} from '@material-ui/core';
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { FaLink } from 'react-icons/fa';

import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import useCopyToClipboard from '@hooks/copyToClipboard';
import { AuthContext } from '@context/auth';
import { MenuListIcon } from '../Header/styles';

interface OptionsMenuProps {
  deletePost: () => void;
  username: string;
  id: string;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  deletePost,
  id,
  username,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { CopyToClipboard, copyToClipboard } = useCopyToClipboard(
    `${process.env.NEXT_PUBLIC_HOST}/post/${id}`,
  );

  return (
    <NoSsr>
      <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
        <IconButton
          aria-label="abrir menu post"
          aria-haspopup="true"
          onClick={handleClick}
          color="secondary"
        >
          <FiMoreHorizontal />
        </IconButton>
        <Menu
          id="menu-post-image"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={copyToClipboard}>
            <MenuListIcon className="prevent-redirect-post">
              <FaLink />
              <p>Copiar Link</p>
              <CopyToClipboard />
            </MenuListIcon>
          </MenuItem>
          {auth.user && auth.user.username === username && (
            <MenuItem onClick={deletePost}>
              <MenuListIcon className="prevent-redirect-post">
                <FiTrash2 className="danger-icon" />
                <p className="danger-icon">Deletar</p>
              </MenuListIcon>
            </MenuItem>
          )}
        </Menu>
      </ThemeProvider>
    </NoSsr>
  );
};

export default OptionsMenu;
