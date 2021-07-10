import React, { useState } from 'react';
import Link from 'next/link';

import ModalProfile from '@components/ModalProfile';
import ModalLikesButton from '@components/Splitter/ModalLikesButton';
import { GET_LIKES, GET_WHO_SHARE_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';

import { InteractionsNumbersContainer } from '../utilsStyles';
import InteractionCount from './InteractionCount';

const initialQuery = {
  queryResult: 'getLikes',
  query: GET_LIKES,
  title: 'Quem Curtiu',
};

interface InteractionsNumbers extends PostProps {
  likesCount: number;
}

const InteractionsNumbers: React.FC<InteractionsNumbers> = ({
  post,
  likesCount,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalPayload, setModalPayload] = useState(initialQuery);

  return (
    <>
      <InteractionsNumbersContainer>
        {likesCount > 0 && (
          <ModalLikesButton
            showModal={() => {
              setModalShow(true);
              setModalPayload(initialQuery);
            }}
            post={post}
            likesCount={likesCount}
          />
        )}
        {post.commentsCount && (
          <Link href={`/post/${post._id}`}>
            <a>
              <InteractionCount
                count={post.commentsCount}
                message="comentário"
              />
            </a>
          </Link>
        )}
        <div>
          {post.sharedCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setModalShow(true);
                setModalPayload({
                  queryResult: 'getWhoSharesPost',
                  query: GET_WHO_SHARE_POST,
                  title: 'Quem Compartilhou',
                });
              }}
              aria-label="Abrir modal de compartilhamentos"
              className="share-count"
            >
              <InteractionCount
                count={post.sharedCount}
                message="compartilhamento"
              />
            </button>
          )}
        </div>
      </InteractionsNumbersContainer>
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          variable={{ id: post._id }}
          payload={modalPayload}
        />
      )}
    </>
  );
};

export default React.memo(InteractionsNumbers);
