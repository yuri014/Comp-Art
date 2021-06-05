import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { LikeButtonProps } from '@interfaces/InteractionButtons';

interface LikeProps extends LikeButtonProps {
  initialLikeState: boolean;
}

const LikeButton: React.FC<LikeProps> = ({
  dislikePost,
  initialLikeState,
  likePost,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    setIsLiked(initialLikeState);
  }, [initialLikeState]);

  return (
    <button
      className={`prevent-redirect-post ${isLiked ? 'active' : ''}`}
      type="button"
      onClick={() => {
        setIsLiked(!isLiked);

        if (isLiked) {
          dislikePost();
        } else {
          likePost();
        }
      }}
      aria-label="Curtir"
    >
      <div className="interactions-button prevent-redirect-post">
        {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        <p className="prevent-redirect-post">Curtir</p>
      </div>
    </button>
  );
};

export default LikeButton;
