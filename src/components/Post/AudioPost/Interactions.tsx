import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import Link from 'next/link';

interface InteractionsProps {
  name: string;
  avatar: string;
  isLiked: boolean;
  dislikePost: () => void;
  likePost: () => void;
  id: string;
}

const Interactions = React.memo<InteractionsProps>(
  ({ avatar, dislikePost, isLiked, likePost, name, id }) => (
    <div role="button" tabIndex={0} className="image">
      <img
        alt={`Imagem de perfil de ${name}`}
        src={process.env.NEXT_PUBLIC_API_HOST + avatar}
      />
      <div className="interactions">
        <div>
          <IconButton
            title="Curtir"
            onClick={() => (isLiked ? dislikePost() : likePost())}
          >
            <span>{isLiked ? <FaHeart /> : <FaRegHeart />}</span>
          </IconButton>
        </div>
        <div>
          <Link href={`/post/${id}`}>
            <a>
              <IconButton title="Comentar">
                <FaRegComment />
              </IconButton>
            </a>
          </Link>
        </div>
        <div>
          <IconButton title="Compartilhar">
            <FaRegShareSquare />
          </IconButton>
        </div>
      </div>
    </div>
  ),
);

export default Interactions;
