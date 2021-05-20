/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import * as linkify from 'linkifyjs';
import Linkify from 'linkifyjs/react';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';
import { useRouter } from 'next/router';

import TextBoxContainer from './styles';

hashtag(linkify);
mention(linkify);

interface TextBoxProps {
  text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
  const router = useRouter();

  return (
    <TextBoxContainer>
      <Linkify
        options={{
          attributes: {
            // @ts-ignore
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
              // @ts-ignore
              const path = e.target.outerText as string;

              if (path[0] === '#') {
                router.push(`/${path.substring(1)}`);
              }

              if (path[0] === '@') {
                router.push(`/profile/${path.substring(1)}`);
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
        }}
      >
        {text.split('\n').map((str, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>{str}</p>
        ))}
      </Linkify>
    </TextBoxContainer>
  );
};

export default TextBox;
