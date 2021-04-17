import Link from 'next/link';
import React from 'react';

import { HashtagsProfileContainer } from './styles';

interface HashtagsProfileProps {
  hashtags: Array<string>;
  isArtist: boolean;
}

const HashtagsProfile: React.FC<HashtagsProfileProps> = ({
  isArtist,
  hashtags,
}) => (
  <HashtagsProfileContainer isArtist={isArtist}>
    <h3># Hashtags seguidas</h3>
    <div className="hashtag-container">
      {hashtags.map(hashtag => (
        <Link key={hashtag} href="/">
          <a>{hashtag}</a>
        </Link>
      ))}
    </div>
  </HashtagsProfileContainer>
);
export default HashtagsProfile;
