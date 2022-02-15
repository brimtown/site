import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import Ball from '../components/Ball';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import FullScreen, { Container } from '../components/FullScreen';
import theme from '../theme';

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0px, 5px, 0px);
  }

  to {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

const HomepageGrid = styled(Grid)`
  min-height: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BodyText = styled.div`
  font-size: 1.5rem;
  font-family: ${(props): string => props.theme.fonts.america};
  line-height: 2rem;

  ${(props): string => props.theme.mediaQueries.small} {
    font-size: 2.5rem;
    line-height: 3.25rem;
  }

  ${(props): string => props.theme.mediaQueries.medium} {
    max-width: 85%;
  }

  ${(props): string => props.theme.mediaQueries.large} {
    max-width: 60%;
  }

  ${(props): string => props.theme.mediaQueries.xlarge} {
    font-size: calc(1vw + 2rem);
    line-height: 1.3;
  }
`;

const HomepageLink = styled.a`
  color: ${(props): string => props.theme.colors.black};
  background-color: ${(props): string => props.theme.colors.cream};
  text-decoration: underline;
  transition: filter 100ms ease-out;

  :hover {
    filter: brightness(115%);
  }
`;

const Footer = styled.div`
  padding-bottom: 1.5rem;

  ${(props): string => props.theme.mediaQueries.small} {
    padding-bottom: 0;
  }
`;

const EmailText = styled.a`
  color: ${(props): string => props.theme.colors.black};
  transition: filter 100ms ease-out;
  font-size: 1rem;

  ${(props): string => props.theme.mediaQueries.small} {
    font-size: 1.625rem;
  }
`;

const BodyParagraph = styled.p`
  margin-bottom: 2rem;
`;

const IndexPage: React.FC = () => (
  <Layout>
    <FullScreen />
    <Container>
      <Ball top={100} left={-200} delay={0} />
      <HomepageGrid>
        <Header color={theme.colors.black} />
        <BodyText>
          <BodyParagraph>
            Tim is an experienced software engineer in New&nbsp;York City who
            builds for the web.
          </BodyParagraph>
          <BodyParagraph>
            He is a Software Engineer at{' '}
            <HomepageLink href="https://www.datadoghq.com/" target="_">
              Datadog
            </HomepageLink>
            .
          </BodyParagraph>
        </BodyText>
        <Footer>
          <EmailText href="mailto:brown.tim.lee@gmail.com">
            brown.tim.lee@gmail.com
          </EmailText>
        </Footer>
      </HomepageGrid>
    </Container>
  </Layout>
);

export default IndexPage;
