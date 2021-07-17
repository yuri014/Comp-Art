/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Timeline } from '@interfaces/Post';
import PostMock from './post';

export const ShareNullMock: Timeline = {
  ...PostMock,
  // @ts-expect-error
  post: { error: true },
  sharedCount: 0,
};

export const ShareMock: Timeline = {
  ...PostMock,
  // @ts-ignore
  post: PostMock,
  sharedCount: 0,
};
