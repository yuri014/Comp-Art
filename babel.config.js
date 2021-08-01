module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'classic',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['transform-dynamic-import'],
    },
  },
  plugins: [['styled-components', { ssr: true }], 'inline-react-svg'],
};
