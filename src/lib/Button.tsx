import styled from '@emotion/styled';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
};

const ButtonBlock = styled.div`
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
  margin: 0;
  padding: 0;
`;

const Button = ({ children }: ButtonProps) => {
  return <ButtonBlock>{children}</ButtonBlock>;
};

export default Button;
