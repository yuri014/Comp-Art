import React from 'react';

import MentionEntry from './MentionEntry';
import useMentions from './mentions';
import usePlugins from './plugins';

const Mention: React.FC = () => {
  const { MentionSuggestions } = usePlugins();
  const { mentionsCallbacks, mentionsStates } = useMentions();

  return (
    <MentionSuggestions
      open={mentionsStates.open}
      onOpenChange={mentionsCallbacks.onOpenChange}
      suggestions={mentionsStates.suggestions}
      onSearchChange={mentionsCallbacks.onSearchChange}
      entryComponent={MentionEntry}
    />
  );
};

export default Mention;
