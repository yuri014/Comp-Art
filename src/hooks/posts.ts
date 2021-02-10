import { useMutation } from '@apollo/client';
import {
  DELETE_POST,
  DISLIKE_POST,
  LIKE_POST,
} from '../graphql/mutations/post';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePostsMutations = (
  id: string,
  dislikeCallback: () => void,
  likeCallback: () => void,
) => {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          getPosts(existingPosts, { readField }) {
            return existingPosts.filter(
              postRef => id !== readField('_id', postRef),
            );
          },
        },
      });
    },
  });

  const [dislikePost] = useMutation(DISLIKE_POST, {
    variables: { id },
    onCompleted: dislikeCallback,
  });

  const [likePost] = useMutation(LIKE_POST, {
    variables: { id },
    onCompleted: likeCallback,
  });

  return [deletePost, dislikePost, likePost];
};

export default usePostsMutations;
