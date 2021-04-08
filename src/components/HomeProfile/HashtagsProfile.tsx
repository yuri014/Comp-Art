import Link from 'next/link';
import React from 'react';

import { HashtagsProfileContainer } from './styles';

interface HashtagsProfileProps {
  hashtags: Array<string>;
}

const HashtagsProfile: React.FC<HashtagsProfileProps> = ({ hashtags }) => (
  <HashtagsProfileContainer>
    <h3># Hashtags seguidas</h3>
    <div className="hashtag-container">
      {hashtags.map(hashtag => (
        <Link href="/">
          <a>{hashtag}</a>
        </Link>
      ))}
    </div>
  </HashtagsProfileContainer>
);

export default HashtagsProfile;
