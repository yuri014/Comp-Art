import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { GET_LIKES } from '../../graphql/mutations/post';
import { PostProps } from '../../interfaces/Post';

const ModalProfile = dynamic(() => import('../ModalProfile'));

interface ModalLikesButtonProps extends PostProps {
  likesCount: number;
}

const ModalLikesButton: React.FC<ModalLikesButtonProps> = ({
  post,
  likesCount,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        type="button"
        aria-label="Abrir modal de likes"
      >
        <div className="likes-images">
          {post.likes &&
            post.likes.map(({ profile }) => (
              <>
                <img
                  key={profile.owner}
                  src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
                  alt={profile.owner}
                  title={profile.owner}
                />
                <img
                  key={profile.owner}
                  src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
                  alt={profile.owner}
                  title={profile.owner}
                />
                <img
                  key={profile.owner}
                  src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
                  alt={profile.owner}
                  title={profile.owner}
                />
              </>
            ))}
        </div>
        {likesCount > 0 && (
          <p>300k {likesCount > 1 ? 'curtidas' : 'curtida'}</p>
        )}
      </button>
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          queryResult="getLikes"
          query={GET_LIKES}
          id={post._id}
        />
      )}
    </>
  );
};

export default ModalLikesButton;
