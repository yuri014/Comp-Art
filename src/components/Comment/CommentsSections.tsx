import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import useInfiniteScroll from '@hooks/infiniteScroll';
import { CommentsSectionsProps, IGetComment } from '@interfaces/Post';
import { CORE_PROFILE_VIEW } from '@graphql/fragments/profile';
import CommentSkeleton from './CommentSkeleton';
import CreateComment from './CreateComment';
import { CommentsSectionContainer } from './styles';
import Comment from '.';

const GET_COMMENTS = gql`
  ${CORE_PROFILE_VIEW}
  query GetComments($id: ID!, $offset: Int!) {
    getComments(postID: $id, offset: $offset) {
      _id
      author {
        ...CoreProfileView
      }
      body
      createdAt
      likesCount
    }
  }
`;

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
      client.cache.evict({ fieldName: 'getComments' });
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
        <CommentSkeleton />
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
