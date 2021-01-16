const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
});

module.exports = {
  images: {
    domains: ['localhost'],
  },
}