import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Menu, MenuItem } from '@material-ui/core';
import { FaSortDown } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

import { MenuListIcon } from '@components/Header/styles';

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;

interface CommentMenuProps {
  id: string;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentMenu: React.FC<CommentMenuProps> = ({ id, setIsDeleted }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: () => setIsDeleted(true),
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu-comment">
      <button
        aria-label="Abrir menu do comentário"
        type="button"
        onClick={handleClick}
      >
        <FaSortDown />
      </button>
      <Menu
        id="menu-comment"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => deleteComment({ variables: { id } })}>
          <MenuListIcon>
            <FiTrash2 className="danger-icon" />
            <p className="danger-icon">Deletar</p>
          </MenuListIcon>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CommentMenu;
