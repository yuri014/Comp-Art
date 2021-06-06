import React from 'react';
import { MentionData } from '@draft-js-plugins/mention';

interface EntryComponentProps {
  className?: string;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  role: string;
  id: string;
  'aria-selected'?: boolean | 'false' | 'true';
  mention: MentionData;
  isFocused: boolean;
  searchValue?: string;
}

const MentionEntry: React.FC<EntryComponentProps> = props => {
  const { mention, ...parentProps } = props;

  return (
    <div {...parentProps} className="mention">
      <div className="mentionSuggestionsEntryContainer">
        <div className="mentionSuggestionsEntryContainerLeft">
          <img
            src={mention.avatar}
            className="mentionSuggestionsEntryAvatar"
            role="presentation"
            alt={mention.name}
          />
        </div>
        <div className="mentionSuggestionsEntryContainerRight">
          <div className="mentionSuggestionsEntryText">{mention.title}</div>
          <div className="mentionSuggestionsEntryTitle">@{mention.name}</div>
        </div>
      </div>
    </div>
  );
};

export default MentionEntry;
