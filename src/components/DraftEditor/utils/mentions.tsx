import { useCallback, useState } from 'react';
import {
  defaultSuggestionsFilter,
  MentionData,
} from '@draft-js-plugins/mention';

import { ISearchProfile } from '@interfaces/Profile';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_PROFILE_PREVIEW_SEARCH } from '@graphql/queries/profile';

type UseMentions = {
  mentionsStates: {
    open: boolean;
    suggestions: MentionData[];
  };
  mentionsCallbacks: {
    onOpenChange: (_open: boolean) => void;
    onSearchChange: ({ value }: { value: string }) => void;
  };
};

const useMentions = (): UseMentions => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    const client = initializeApollo();

    client
      .query<ISearchProfile>({
        query: GET_PROFILE_PREVIEW_SEARCH,
        variables: { query: value, offset: 0, limit: 6 },
        fetchPolicy: 'no-cache',
      })
      .then(result => {
        const searchProfiles = result.data.searchProfiles.map(profile => ({
          title: profile.name,
          name: `${profile.owner}`,
          avatar: process.env.NEXT_PUBLIC_API_HOST + profile.avatar,
        }));
        setSuggestions(defaultSuggestionsFilter(value, searchProfiles));
      });
  }, []);

  return {
    mentionsStates: { open, suggestions },
    mentionsCallbacks: { onOpenChange, onSearchChange },
  };
};

export default useMentions;
