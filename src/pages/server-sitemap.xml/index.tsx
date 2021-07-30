/* eslint-disable @typescript-eslint/no-empty-function */
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

const createField = (array: [], uri: string, access: string): ISitemapField[] =>
  array.map(value => ({
    loc: `${process.env.NEXT_PUBLIC_HOST}/${uri}/${value[access]}`,
    lastmod: new Date().toISOString(),
    priority: '0.8',
    changefreq: 'daily',
  }));

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sitemap`);

  const jsonData = await data.json();

  const profiles = createField(jsonData.profiles, 'profile', 'owner');
  const posts = createField(jsonData.posts, 'post', '_id');

  return getServerSideSitemap(ctx, profiles.concat(posts));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {};
