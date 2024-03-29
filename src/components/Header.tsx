import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const HeaderWrapper = styled.nav<Props>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${(props): string => props.theme.colors.black};
  font-size: 1.5rem;
  line-height: 1.1;
  letter-spacing: -1px;
  font-family: ${(props): string => props.theme.fonts.america};

  ${(props): string => props.theme.mediaQueries.small} {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const NameLink = styled(Link)`
  color: inherit;
  transition: color ${(props): string => props.theme.animations.fast};
`;

const AdditionalLink = styled(Link)`
  transition: transform ${(props): string => props.theme.animations.fast};
  color: inherit;
  font-weight: bold;

  :hover {
    transform: rotate(90deg);
  }
`;

interface Props {
  color?: string;
}

const Header: React.FC<Props> = ({ color }) => (
  <HeaderWrapper color={color}>
    <NameLink to="/">Tim Brown</NameLink>
    <AdditionalLink to="/links" aria-label="Links">
      ＋
    </AdditionalLink>
  </HeaderWrapper>
);

export default Header;
