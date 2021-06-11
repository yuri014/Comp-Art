import React from 'react';
import { SocialMediaPosting } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';

import { Timeline } from '@interfaces/Post';

interface PostSchemaProps {
  post: Timeline;
}

const PostSchema: React.FC<PostSchemaProps> = ({ post }) => (
  <JsonLd<SocialMediaPosting>
    item={{
      '@context': 'https://schema.org',
      '@type': 'SocialMediaPosting',
      about: {
        '@type': 'Thing',
        description: 'CreativeWork',
      },
      identifier: post._id,
      commentCount: post.commentsCount,
      url: `${process.env.NEXT_PUBLIC_HOST}/post/${post._id}`,
      author: {
        '@type': 'Person',
        additionalName: post.artist.owner,
        givenName: post.artist.name,
      },
      disambiguatingDescription: 'Post',
      dateCreated: post.createdAt,
      datePublished: post.createdAt,
    }}
  />
);

export default PostSchema;
