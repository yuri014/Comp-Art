import React, { useMemo } from 'react';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createMentionPlugin from '@draft-js-plugins/mention';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { MentionSuggestionsPubProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/MentionSuggestions';

const hashtagPlugin = createHashtagPlugin({
  hashtagComponent: ({ children }) => (
    <span className="hashtag">{children}</span>
  ),
});

const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  mentionPrefix: '@',
  supportWhitespace: true,
});

const plugins = [mentionPlugin, hashtagPlugin];

type UsePlugins = {
  plugins: EditorPlugin[];
  MentionSuggestions: React.ComponentType<MentionSuggestionsPubProps>;
};

const usePlugins = (): UsePlugins => {
  const pluginsConfig = useMemo(() => {
    const { MentionSuggestions } = mentionPlugin;
    return { plugins, MentionSuggestions };
  }, []);

  return pluginsConfig;
};

export default usePlugins;
