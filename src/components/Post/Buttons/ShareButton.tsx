import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Menu, MenuItem } from '@material-ui/core';

import { MenuListIcon } from '@components/Header/styles';
import { FaShareAlt, FaShare, FaEdit } from 'react-icons/fa';
import { ShareButtonProps } from '@interfaces/InteractionButtons';

const QUICK_SHARE_POST = gql`
  mutation CreateSharePost($shareInput: SharePost!) {
    createSharePost(shareInput: $shareInput)
  }
`;

const ShareButton: React.FC<ShareButtonProps> = ({ postID, updateLevel }) => {
  const [quickSharePost] = useMutation(QUICK_SHARE_POST, {
    onCompleted: () => updateLevel(),
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        aria-label="Compartilhar"
        type="button"
        aria-haspopup="true"
        onClick={handleClick}
        className="prevent-redirect-post"
      >
        <div className="interactions-button prevent-redirect-post">
          <FaShareAlt size={20} />{' '}
          <p className="prevent-redirect-post">Compartilhar</p>
        </div>
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="prevent-redirect-post"
      >
        <MenuItem onClick={handleClose}>
          <MenuListIcon
            as="button"
            onClick={() =>
              quickSharePost({
                variables: {
                  shareInput: {
                    description: '',
                    postID,
                  },
                },
              })
            }
          >
            <FaShare />
            <p className="prevent-redirect-post">Compartilhar agora</p>
          </MenuListIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MenuListIcon>
            <FaEdit />
            <p className="prevent-redirect-post">Compartilhar com comentário</p>
          </MenuListIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(ShareButton);
