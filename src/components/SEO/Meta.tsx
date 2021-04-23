import Head from 'next/head';
import React from 'react';

interface MetaProps {
  title: string;
  description: string;
  keywords: string;
  seoImage?: string;
  uri?: string;
}

const Meta: React.FC<MetaProps> = ({
  uri,
  title,
  description,
  keywords,
  seoImage,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:type" content="website" />
    <meta
      property="og:url"
      content={
        uri
          ? `${process.env.NEXT_PUBLIC_HOST}/${uri}`
          : process.env.NEXT_PUBLIC_HOST
      }
    />
    <meta property="og:title" content="Comp-Art" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={seoImage} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:url"
      content={
        uri
          ? `${process.env.NEXT_PUBLIC_HOST}/${uri}`
          : process.env.NEXT_PUBLIC_HOST
      }
    />
    <meta property="twitter:title" content="Comp-Art" />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={seoImage} />
  </Head>
);

Meta.defaultProps = {
  seoImage: '/CardSEO.png',
};

export default Meta;
