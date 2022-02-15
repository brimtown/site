import styled, { createGlobalStyle } from 'styled-components';

const FullScreen = createGlobalStyle`
  html {
    height: -webkit-fill-available;
  }

  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    min-width: 100vw;
    min-width: -webkit-fill-available;
    height: 100%;
  }

  #___gatsby,
#gatsby-focus-wrapper {
  min-height: inherit;
  height: 100%;
    }
`;

export const Container = styled.div`
  min-height: inherit;
  height: 100%;
  overflow: hidden;
`;

export default FullScreen;
