import React, { memo, useContext, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';

import { AuthContext } from '../../context/auth';

interface OptionsMenuProps {
  deletePost: () => void;
  username: string;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ deletePost, username }) => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="menu-post"
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
      >
        <FiMoreVertical />
      </IconButton>
      <Menu
        id="menu-post-image"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Copiar Link</MenuItem>
        {auth.user && auth.user.username === username && (
          <MenuItem onClick={deletePost}>
            <span className="danger-icon">Deletar &nbsp;</span>
            <FiTrash2 className="danger-icon" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default memo(OptionsMenu);
