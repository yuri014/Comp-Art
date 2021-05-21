import {
  FetchResult,
  MutationFunctionOptions,
  useMutation,
} from '@apollo/client';
import {
  DELETE_POST,
  DISLIKE_POST,
  LIKE_POST,
} from '../graphql/mutations/post';

export type UsePostsMutations = ((
  options?: MutationFunctionOptions<
    unknown,
    {
      id: string;
    }
  >,
) => Promise<
  FetchResult<unknown, Record<string, unknown>, Record<string, unknown>>
>)[];

const usePostsMutations = (
  id: string,
  dislikeCallback?: () => void,
  likeCallback?: () => void,
): UsePostsMutations => {
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
