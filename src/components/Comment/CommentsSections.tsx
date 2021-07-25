import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import useInfiniteScroll from '@hooks/infiniteScroll';
import { CommentsSectionsProps, IGetComment } from '@interfaces/Post';
import GET_COMMENTS from '@graphql/queries/comment';
import CommentSkeleton from './CommentSkeleton';
import CreateComment from './CreateComment';
import { CommentsSectionContainer } from './styles';
import Comment from '.';

const CommentsSections: React.FC<CommentsSectionsProps> = ({
  postId,
  profile,
}) => {
  const {
    data: commentsData,
    loading,
    error,
    fetchMore,
    client,
  } = useQuery<IGetComment>(GET_COMMENTS, {
    variables: { id: postId, offset: 0 },
  });

  useEffect(
    () => () => {
      client.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'getComments',
        broadcast: false,
      });
      client.cache.gc();
    },
    [client.cache],
  );

  const lastCommentRef = useInfiniteScroll(commentsData, async () => {
    if (commentsData.getComments.length === 6) {
      const newComments = await fetchMore({
        variables: { offset: commentsData.getComments.length },
      });
      return newComments.data.getComments.length === 6;
    }

    return false;
  });

  return (
    <CommentsSectionContainer>
      <CreateComment profile={profile} postId={postId} />
      {loading || error || !commentsData ? (
        <>{loading && <CommentSkeleton />}</>
      ) : (
        commentsData.getComments.map((comment, index) => {
          if (commentsData.getComments.length === index + 1) {
            return (
              <span
                key={`${comment.author.owner}_${comment.createdAt}`}
                ref={lastCommentRef}
              >
                <Comment comment={comment} />
              </span>
            );
          }

          return (
            <span key={`${comment.author.owner}_${comment.createdAt}`}>
              <Comment comment={comment} />
            </span>
          );
        })
      )}
    </CommentsSectionContainer>
  );
};

export default CommentsSections;
