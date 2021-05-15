import React from 'react';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createCounterPlugin from '@draft-js-plugins/counter';

const hashtagPlugin = createHashtagPlugin({
  hashtagComponent: ({ children }) => (
    <span className="hashtag">{children}</span>
  ),
});

const counterTheme = {
  counter: 'counter',
  counterOverLimit: 'counter-limit',
};

const counterPlugin = createCounterPlugin({ theme: counterTheme });

export const plugins = [hashtagPlugin, counterPlugin];

export const { CharCounter } = counterPlugin;
