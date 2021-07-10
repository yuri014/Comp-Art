import { css } from 'styled-components';

const cssVars = css`
  :root {
    --color-main: #1cc5b7;
    --color-title: #50c878;
    --color-background: #050211;
    --color-background-secondary: #202024;
    --color-background-alternative: #111112;
    --color-background-light-secondary: #28282c;
    --color-background-lighter-secondary: #38383c;
    --color-background-modal: #202024;
    --color-background-share: #26262f;
    --color-background-popover: #0e0b21;
    --color-background-comment: #38383c;
    --color-background-input: #44444e;
    --color-text-light: #cbcaeb;
    --color-text-namesake: #08162f;
    --color-contrast-light: #cbcaeb;
    --color-gray-dark: #ababab;
    --color-gray: #ababab;
    --color-gray-light: #e1e1e1;
    --color-purple: #625ccc;
    --color-border: #38383c;
    --color-green-light: #5dd083;
    --color-hashtag: #4bf1e3;
    --color-link: #80acff;
    --color-danger: #d20450;
    --color-error: #ff3838;
    --color-pink: #ff4f6d;
    --color-theme: #f5f5ff;

    --shadow-primary: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    --shadow-secondary: 0px 0px;

    --mdxtheme-background: '#15121F';
    --mdxtheme-text: '#cbcaeb';
  }

  [data-theme='light'] {
    --color-main: #077e76;
    --color-title: rgba(0, 0, 0, 0.2);
    --color-background: #edf1f2;
    --color-background-secondary: #fff;
    --color-background-alternative: #f5f5f5;
    --color-background-light-secondary: #f0f0f0;
    --color-background-lighter-secondary: #e5e5e5;
    --color-background-modal: #fff;
    --color-background-share: #eee;
    --color-background-popover: #cbcaeb;
    --color-background-comment: #dddddd;
    --color-background-input: #dddddd;
    --color-text-light: #414145;
    --color-gray-dark: #38383c;
    --color-gray: #716f6f;
    --color-gray-light: #38383c;
    --color-border: #adadad;
    --color-hashtag: #625ccc;
    --color-link: #13418b;
    --color-theme: #28282c;

    --shadow-primary: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    --shadow-secondary: #d3d6db 1px 1px 5px 0px inset,
      #ffffff80 -1px -1px 5px 1px inset;

    --mdxtheme-background: '#cbcaeb';
    --mdxtheme-text: '#15121F';
  }
`;

export default cssVars;
