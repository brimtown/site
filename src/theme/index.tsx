import { createGlobalStyle } from 'styled-components';
import { Univers, America } from './typography';

const breakpoints = ['480px', '768px', '1024px', '2048px'];

const theme = {
  animations: {
    fast: '150ms ease-out',
  },
  colors: {
    black: '#0c0c0c',
    burnt: '#802200',
    orange: '#ff5800',
    cream: '#fce481',
    lightcream: '#fff4e9',
    yellow: '#fcd34d',
  },
  fonts: {
    sectra: 'Sectra, georgia, serif',
    univers: 'Univers, Helvetica, sans-serif',
    america: 'America, Helvetica, sans-serif',
    americaExtended: 'AmericaExtended, Helvetica, sans-serif',
  },
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
    xlarge: `@media screen and (min-width: ${breakpoints[3]})`,
  },
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: Univers;
      font-display: block;
      src:url("${Univers.woff2}") format("woff2");
          url("${Univers.woff}") format("woff");
  }
  @font-face {
      font-family: America;
      font-display: block;
      src:url("${America.woff2}") format("woff2");
  }
  html, body, div, span,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, img, ol, ul, li, fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, section, summary {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  html {
    box-sizing: border-box;
    overflow-y: scroll;
  }
  * {
    box-sizing: inherit;
  }
  *:before {
    box-sizing: inherit;
  }
  *:after {
    box-sizing: inherit;
  }
  body {
    background-color: ${theme.colors.yellow};
    color: ${theme.colors.black};
    font-family: ${theme.fonts.america};
  }
  a {
    text-decoration: none;
  }
  ::selection {
    background: ${theme.colors.cream};
  }
`;

export default theme;
