const withImages = require('next-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins')

const imagesPlugin = withImages({
  esModule: true,
});

const pwaPlugin = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    runtimeCaching,
  },
});

module.exports = withPlugins([imagesPlugin, pwaPlugin, {
  images: {
    domains: ['localhost'],
  },
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
}]);
