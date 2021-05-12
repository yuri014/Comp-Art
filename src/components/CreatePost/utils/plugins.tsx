import React from 'react';
import createHashtagPlugin from '@draft-js-plugins/hashtag';

const hashtagPlugin = createHashtagPlugin({
  hashtagComponent: ({ children }) => (
    <span className="hashtag">{children}</span>
  ),
});

const plugins = [hashtagPlugin];

export default plugins;
