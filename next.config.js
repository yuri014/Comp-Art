const withImages = require('next-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')();

module.exports = withPlugins(
  [
    [
      withImages,
      {
        esModule: true,
      },
    ],
    [withMDX],
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === 'development',
          dest: 'public',
          register: true,
          runtimeCaching,
        },
      },
    ],
  ],
  {
    images: {
      domains: [
        'localhost',
        'comp-art.s3.sa-east-1.amazonaws.com',
        'placekitten.com',
      ],
    },
    webpack5: true,
    reactStrictMode: true,
    experimental: {
      scrollRestoration: true,
    },
  },
);
