import React from 'react';
import Link from 'next/link';

interface LinksProps {
  username: string;
  description: string;
  name: string;
  id: string;
}

const Links = React.memo<LinksProps>(({ username, description, name, id }) => (
  <div>
    <Link href={`/post/${id}`}>
      <a>
        <p className="music-name" title={description}>
          {description}
        </p>
      </a>
    </Link>
    <Link href={`/profile/${username}`}>
      <a>
        <p className="artist-name">{name}</p>
      </a>
    </Link>
  </div>
));

export default Links;
