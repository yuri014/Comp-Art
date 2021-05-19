/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { SyntheticEvent } from 'react';
import * as linkify from 'linkifyjs';
import Linkify from 'linkifyjs/react';
import hashtag from 'linkifyjs/plugins/hashtag';
import { useRouter } from 'next/router';

hashtag(linkify);

interface TextBoxProps {
  text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
  const router = useRouter();

  return (
    <Linkify
      options={{
        attributes: {
          // @ts-ignore
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            console.log(e);

            // @ts-ignore
            const path = e.target.outerText as string;

            router.push(`/${path.substring(1)}`);
          },
        },
        formatHref(href, type) {
          if (type === 'hashtag') {
            return '';
          }

          href = `${href.substring(1)}`;
          return href;
        },
      }}
    >
      #bahh
      https://www.google.com/search?q=linkify+with+react+link&oq=linkify+with+react+link&aqs=chrome..69i57.5458j0j1&sourceid=chrome&ie=UTF-8
    </Linkify>
  );
};

export default TextBox;
