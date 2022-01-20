import React from 'react';
import styled from '@emotion/styled';
import { MdRefresh } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const HeaderBlock = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const TitleBlock = styled(NavLink)`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  font-family: 'PT Sans Narrow', sans-serif;
`;

const NavBlock = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
`;

const StyledNavLink = styled(NavLink)`
  padding: 0 0.25rem;
  margin: 0 0.5rem;
  color: grey;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  font-size: 1.125rem;
`;

type NavLinkBlockProps = {
  to: string;
  children: React.ReactNode;
};

const NavLinkBlock = ({ to, children }: NavLinkBlockProps) => (
  <StyledNavLink
    to={to}
    style={({ isActive }) =>
      isActive
        ? {
            color: 'black',
            fontWeight: 'bold',
            borderBottom: '2px solid black',
          }
        : {}
    }
  >
    {children}
  </StyledNavLink>
);

function Header() {
  return (
    <HeaderBlock>
      <TitleBlock to="/">
        Routine
        <MdRefresh />
      </TitleBlock>
      <NavBlock>
        <NavLinkBlock to="/">홈</NavLinkBlock>
        <NavLinkBlock to="/routine">루틴</NavLinkBlock>
        <NavLinkBlock to="/record">기록</NavLinkBlock>
      </NavBlock>
    </HeaderBlock>
  );
}

export default Header;
