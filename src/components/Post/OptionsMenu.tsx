import React, { useContext, useRef, useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  ThemeProvider,
} from '@material-ui/core';
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { FaLink, FaTimes } from 'react-icons/fa';

import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import { AuthContext } from '../../context/auth';
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
  const clip = useRef(null);
  const [isClipped, setIsClipped] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyToClipboard = () => {
    clip.current.select();
    document.execCommand('copy');
    setIsClipped(true);
  };

  return (
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
            <textarea
              ref={clip}
              readOnly
              style={{ position: 'absolute', left: '-999em' }}
              value={`${process.env.NEXT_PUBLIC_HOST}/post/${id}`}
            />
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isClipped}
        autoHideDuration={1000}
        onClose={() => setIsClipped(false)}
        message="Copiado"
        color="error"
        action={
          <IconButton
            size="small"
            aria-label="fechar menu post"
            onClick={() => setIsClipped(false)}
            color="primary"
          >
            <FaTimes />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
};

export default OptionsMenu;
