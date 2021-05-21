import { FetchResult, MutationFunctionOptions } from '@apollo/client';

type UseInteractionsMutationResult = ((
  options?: MutationFunctionOptions<
    unknown,
    {
      id: string;
    }
  >,
) => Promise<
  FetchResult<unknown, Record<string, unknown>, Record<string, unknown>>
>)[];

/**
 * Tipo do hook usePostsMutations e useSharesMutations
 */
export type UseInteractionsMutation = (
  id: string,
  dislikeCallback?: () => void,
  likeCallback?: () => void,
) => UseInteractionsMutationResult;
