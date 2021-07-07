import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import { FaShareAlt, FaShare, FaEdit } from 'react-icons/fa';

import { MenuListIcon } from '@components/Header/styles';
import { ShareButtonProps } from '@interfaces/InteractionButtons';
import { ModalProvider } from '@context/modal';
import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import ModalShareDescription from './ModalShareDescription';
import UnlockArtist from './UnlockArtist';

const QUICK_SHARE_POST = gql`
  mutation CreateSharePost($shareInput: SharePost!) {
    createSharePost(shareInput: $shareInput) {
      levelUp
      isFreeToPost
    }
  }
`;

const ShareButton: React.FC<ShareButtonProps> = ({ postID, updateLevel }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isFreeToPost, setIsFreeToPost] = useState(false);

  const [sharePost] = useMutation(QUICK_SHARE_POST, {
    onCompleted: data => {
      if (data.createSharePost) {
        setIsFreeToPost(data.createSharePost.isFreeToPost);
      }
      setShowModal(false);

      if (updateLevel) {
        updateLevel();
      }
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSharePost = (description = '') => {
    sharePost({
      variables: {
        shareInput: {
          description,
          postID,
        },
      },
    });
  };

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
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
        <MenuItem
          onClick={() => {
            handleSharePost();
            handleClose();
          }}
        >
          <MenuListIcon>
            <FaShare />
            <p className="prevent-redirect-post">Compartilhar agora</p>
          </MenuListIcon>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowModal(true);
            handleClose();
          }}
        >
          <MenuListIcon>
            <FaEdit />
            <p className="prevent-redirect-post">Compartilhar com comentário</p>
          </MenuListIcon>
        </MenuItem>
      </Menu>
      {showModal && (
        <ModalProvider onHide={() => setShowModal(false)} title="Compartilhar">
          <ModalShareDescription sharePost={handleSharePost} />
        </ModalProvider>
      )}
      {isFreeToPost && (
        <ModalProvider
          onHide={() => setShowModal(false)}
          title="Você ajudou outros como você, agora está liberado para postar novamente!"
        >
          <UnlockArtist setShowModal={setIsFreeToPost} />
        </ModalProvider>
      )}
    </ThemeProvider>
  );
};

export default React.memo(ShareButton);
