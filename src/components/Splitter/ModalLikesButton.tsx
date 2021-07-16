import React from 'react';

import InteractionCount from '@components/Post/utils/InteractionCount';

import ProfileImage from '@components/ProfileImage';
import { PostProps } from '../../interfaces/Post';

interface ModalLikesButtonProps extends PostProps {
  likesCount: number;
  showModal: () => void;
}

const ModalLikesButton: React.FC<ModalLikesButtonProps> = ({
  post,
  likesCount,
  showModal,
}) => (
  <>
    <button onClick={showModal} type="button" aria-label="Abrir modal de likes">
      <div className="likes-images prevent-redirect-post">
        {post.likes &&
          post.likes.map(
            ({ profile }) =>
              !!profile && (
                <ProfileImage
                  key={profile.owner}
                  alt={profile.owner}
                  avatar={profile.avatar}
                  username={profile.owner}
                  className="like-profile-image"
                />
              ),
          )}
      </div>
      <InteractionCount count={likesCount} message="curtida" />
    </button>
  </>
);

export default ModalLikesButton;
