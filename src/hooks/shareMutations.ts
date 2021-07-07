import { useMutation } from '@apollo/client';
import { UseInteractionsMutation } from '@interfaces/Hooks';
import {
  DELETE_SHARE,
  DISLIKE_SHARE,
  LIKE_SHARE,
} from '../graphql/mutations/share';

const useSharesMutations: UseInteractionsMutation = (
  id,
  dislikeCallback,
  likeCallback,
) => {
  const [deletePost] = useMutation(DELETE_SHARE, {
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          getPosts(existingPosts, { readField }) {
            return existingPosts.filter(
              postRef => id !== readField('_id', postRef),
            );
          },
          getProfilePosts(existingPosts, { readField }) {
            return existingPosts.filter(
              postRef => id !== readField('_id', postRef),
            );
          },
        },
      });
    },
  });

  const [dislikePost] = useMutation(DISLIKE_SHARE, {
    variables: { id },
    onCompleted: dislikeCallback,
  });

  const [likePost] = useMutation(LIKE_SHARE, {
    variables: { id },
    onCompleted: likeCallback,
  });

  return [deletePost, dislikePost, likePost];
};

export default useSharesMutations;
