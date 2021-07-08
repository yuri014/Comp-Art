import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
  const [isShowMore, setIsShowMore] = useState(false);
  const [clampText, setClampText] = useState('');
  const { push } = useRouter();

  const showMore = () => setClampText(text);
  const showLess = useCallback(
    () => setClampText(`${text.substring(0, 150)}...`),
    [text],
  );

  useEffect(() => {
    if (text.length > 150) {
      showLess();
    } else {
      setClampText(text);
    }
  }, [showLess, text]);

  return (
    <TextBoxContainer>
      <Linkify options={textBoxOptions(push)}>
        <div>
          <p>
            {clampText.split('\n').map(str => (
              <Fragment key={str}>
                {str} <br />
              </Fragment>
            ))}
          </p>
          {text.length > 150 && (
            <button
              onClick={() => {
                if (isShowMore) {
                  showLess();
                } else {
                  showMore();
                }

                setIsShowMore(!isShowMore);
              }}
              type="button"
            >
              Mostrar {isShowMore ? 'menos' : 'mais'}
            </button>
          )}
        </div>
      </Linkify>
    </TextBoxContainer>
  );
};

export default React.memo(TextBox);
