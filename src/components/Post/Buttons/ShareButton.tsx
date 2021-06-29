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
import DraftEditor from '@components/DraftEditor';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import CAButton from '@styles/components/button';
import DescriptionCounter from '@components/DraftEditor/utils/DescriptionCounter';
import { ModalShareContainer } from './styles';

const QUICK_SHARE_POST = gql`
  mutation CreateSharePost($shareInput: SharePost!) {
    createSharePost(shareInput: $shareInput)
  }
`;

const ShareButton: React.FC<ShareButtonProps> = ({ postID, updateLevel }) => {
  const isMount = usePreventMemoryLeak();
  const { isDarkMode } = useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [commentField, setCommentField] = useState('');
  const [progress, setProgress] = useState(0);

  const [sharePost] = useMutation(QUICK_SHARE_POST, {
    onCompleted: () => {
      setShowModal(false);
      updateLevel();
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
          {isMount && (
            <ModalShareContainer className="modal-content">
              <div className="input-container">
                <div className="draft-container">
                  <DraftEditor
                    setText={setCommentField}
                    setProgress={setProgress}
                    limit={1200}
                    placeholder="Digite aqui o seu comentário..."
                  />
                </div>
                <DescriptionCounter
                  className="counter-container"
                  progress={progress}
                />
              </div>
              <CAButton
                onClick={() => handleSharePost(commentField)}
                type="button"
              >
                Compartilhar
              </CAButton>
            </ModalShareContainer>
          )}
        </ModalProvider>
      )}
    </ThemeProvider>
  );
};

export default React.memo(ShareButton);
