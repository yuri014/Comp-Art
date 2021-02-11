import React, { memo, useContext, useRef, useState } from 'react';
import { IconButton, Menu, MenuItem, Snackbar } from '@material-ui/core';
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';

import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../context/auth';

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
        <MenuItem onClick={copyToClipboard}>
          Copiar Link
          <textarea
            ref={clip}
            style={{ position: 'absolute', left: '-999em' }}
            value={`${process.env.NEXT_PUBLIC_HOST}/post/${id}`}
          />
        </MenuItem>
        {auth.user && auth.user.username === username && (
          <MenuItem onClick={deletePost}>
            <span className="danger-icon">Deletar &nbsp;</span>
            <FiTrash2 className="danger-icon" />
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
            aria-label="close"
            onClick={() => setIsClipped(false)}
            color="primary"
          >
            <FaTimes />
          </IconButton>
        }
      />
    </>
  );
};

export default memo(OptionsMenu);
