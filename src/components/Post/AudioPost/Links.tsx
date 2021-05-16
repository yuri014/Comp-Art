import React from 'react';
import Link from 'next/link';

interface LinksProps {
  username: string;
  title: string;
  name: string;
  id: string;
}

const Links = React.memo<LinksProps>(({ username, title, name, id }) => (
  <div>
    <Link href={`/post/${id}`}>
      <a>
        <p className="music-name" title={title}>
          {title}
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
