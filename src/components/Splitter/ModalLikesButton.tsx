import React from 'react';

import InteractionCount from '@components/Post/utils/InteractionCount';

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
          post.likes.map(({ profile }) => (
            <img
              key={profile.owner}
              src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
              alt={profile.owner}
              title={profile.owner}
            />
          ))}
      </div>
      <InteractionCount count={likesCount} message="curtida" />
    </button>
  </>
);

export default ModalLikesButton;
