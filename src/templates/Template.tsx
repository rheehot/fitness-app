import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';

const TemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media (min-width: 768px) {
    width: 768px;
  }
`;

const ContentBlock = styled.div`
  width: 100%;
  background: ${(props) => props.theme.background_main};
  padding: 1rem;
  border-radius: 0.5rem;
`;

type TemplateProps = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => {
  return (
    <TemplateBlock>
      <Header />
      <ContentBlock>{children}</ContentBlock>
    </TemplateBlock>
  );
};

export default Template;
