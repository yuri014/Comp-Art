/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Options } from 'linkifyjs';

const textBoxOptions = (push: (url: string) => Promise<boolean>): Options => ({
  attributes: {
    // @ts-ignore
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      // @ts-ignore
      const path = e.target.outerText as string;

      if (path[0] === '#') {
        push(`/tag/${path.substring(1)}`);
      }

      if (path[0] === '@') {
        push(`/profile/${path.substring(1)}`);
      }
    },
  },
  tagName: {
    url: 'a',
    hashtag: 'span',
    mention: 'span',
  },
  rel: 'noopener noreferrer',
  target: {
    url: '_blank',
  },
  className: {
    hashtag: 'hashtag',
    mention: 'mention',
  },
});

export default textBoxOptions;
