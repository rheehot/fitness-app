import { css } from '@emotion/react';

export const globalStyles = css`
  a {
    color: inherit;
    text-decoration: none;
  }

  html {
    overflow-y: scroll;
  }

  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  input,
  textarea {
    font-family: 'Noto Sans KR', sans-serif;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  hr {
    border: none;
    border-top: 1px solid #cccccc;
    background: none;
    margin: 3rem 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
