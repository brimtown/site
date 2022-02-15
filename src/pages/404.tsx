import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import FullScreen, { Container } from '../components/FullScreen';
import Ball from '../components/Ball';
import Header from '../components/Header';
import theme from '../theme';

const Body = styled.p`
  font-family: ${(props): string => props.theme.fonts.america};
  font-size: 1.25rem;
`;

const NotFoundPage: React.FC = () => (
  <Layout>
    <FullScreen />
    <Container>
      <Ball top={150} left={-20} delay={500} />
      <Ball top={150} left={-20} delay={750} />
      <Ball top={150} left={-20} delay={1000} />
      <Grid>
        <Header color={theme.colors.black} />
        <Body>The page you requested couldn't be found.</Body>
      </Grid>
    </Container>
  </Layout>
);

export default NotFoundPage;
