import React, { useMemo } from 'react';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createCounterPlugin from '@draft-js-plugins/counter';
import createMentionPlugin from '@draft-js-plugins/mention';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { MentionSuggestionsPubProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/MentionSuggestions';

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
const mentionPlugin = createMentionPlugin();

const plugins = [mentionPlugin, hashtagPlugin, counterPlugin];

type UsePlugins = {
  plugins: EditorPlugin[];
  MentionSuggestions: React.ComponentType<MentionSuggestionsPubProps>;
};

export const usePlugins = (): UsePlugins => {
  const pluginsConfig = useMemo(() => {
    const { MentionSuggestions } = mentionPlugin;
    return { plugins, MentionSuggestions };
  }, []);

  return pluginsConfig;
};

export const { CharCounter } = counterPlugin;
