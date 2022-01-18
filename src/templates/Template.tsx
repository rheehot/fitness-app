import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';

const TemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentBlock = styled.div`
  width: 100%;
  background: white;
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
