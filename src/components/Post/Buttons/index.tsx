import React from 'react';
import {
  FaHeart,
  FaRegBookmark,
  FaCommentAlt,
  FaRegHeart,
  FaShareAlt,
  FaShare,
  FaEdit,
} from 'react-icons/fa';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import { Menu, MenuItem } from '@material-ui/core';
import { MenuListIcon } from '@components/Header/styles';

interface PostInteractionButtonsProps {
  isLiked: boolean;
  dislikePost: () => void;
  likePost: () => void;
  postID: string;
}

const SAVE_POST = gql`
  mutation AddSavedPost($id: ID!) {
    addSavedPost(postID: $id)
  }
`;

const QUICK_SHARE_POST = gql`
  mutation CreateSharePost($shareInput: SharePost!) {
    createSharePost(shareInput: $shareInput)
  }
`;

const PostInteractionButtons: React.FC<PostInteractionButtonsProps> = ({
  dislikePost,
  isLiked,
  likePost,
  postID,
}) => {
  const [savePost] = useMutation(SAVE_POST);
  const [quickSharePost] = useMutation(QUICK_SHARE_POST);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="post-interaction">
      <div className="interaction-group">
        <button
          className={isLiked ? 'active' : ''}
          type="button"
          onClick={() => (isLiked ? dislikePost() : likePost())}
          aria-label="Curtir"
        >
          <div className="interactions-button">
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            <p>Curtir</p>
          </div>
        </button>
        <Link href={`/post/${postID}`}>
          <a aria-label="Comentar">
            <div className="interactions-button">
              <FaCommentAlt size={20} /> <p>Comentar</p>
            </div>
          </a>
        </Link>
        <button
          aria-label="Compartilhar"
          type="button"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <div className="interactions-button">
            <FaShareAlt size={20} /> <p>Compartilhar</p>
          </div>
        </button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
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
              <p>Compartilhar agora</p>
            </MenuListIcon>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MenuListIcon>
              <FaEdit />
              <p>Compartilhar com comentário</p>
            </MenuListIcon>
          </MenuItem>
        </Menu>
      </div>
      <button
        className="bookmark"
        aria-label="Salvar"
        type="button"
        onClick={() => savePost({ variables: { id: postID } })}
      >
        <div className="interactions-button">
          <FaRegBookmark size={20} /> <p>Salvar</p>
        </div>
      </button>
    </div>
  );
};

export default PostInteractionButtons;
