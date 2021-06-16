import React from 'react';
import * as linkify from 'linkifyjs';
import Linkify from 'linkifyjs/react';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';
import { useRouter } from 'next/router';

import TextBoxContainer from './styles';
import textBoxOptions from './utils/options';

hashtag(linkify);
mention(linkify);

interface TextBoxProps {
  text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
  const { push } = useRouter();

  return (
    <TextBoxContainer>
      <Linkify options={textBoxOptions(push)}>
        {text.split('\n').map((str, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>{str}</p>
        ))}
      </Linkify>
    </TextBoxContainer>
  );
};

export default React.memo(TextBox);
