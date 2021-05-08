import React from 'react';
import {
  FaHeart,
  FaRegBookmark,
  FaCommentAlt,
  FaRegHeart,
  FaShareAlt,
} from 'react-icons/fa';
import Link from 'next/link';

interface PostInteractionButtonsProps {
  isLiked: boolean;
  dislikePost: () => void;
  likePost: () => void;
  postID: string;
}

const PostInteractionButtons: React.FC<PostInteractionButtonsProps> = ({
  dislikePost,
  isLiked,
  likePost,
  postID,
}) => (
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
        <a>
          <button aria-label="Comentar" type="button">
            <div className="interactions-button">
              <FaCommentAlt size={20} /> <p>Comentar</p>
            </div>
          </button>
        </a>
      </Link>
      <button aria-label="Compartilhar" type="button">
        <div className="interactions-button">
          <FaShareAlt size={20} /> <p>Compartilhar</p>
        </div>
      </button>
    </div>
    <button className="bookmark" aria-label="Salvar" type="button">
      <div className="interactions-button">
        <FaRegBookmark size={20} /> <p>Salvar</p>
      </div>
    </button>
  </div>
);

export default PostInteractionButtons;
