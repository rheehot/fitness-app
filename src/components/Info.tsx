import React from 'react';
import styled from '@emotion/styled';
import { UserStateType } from 'modules/user';

const InfoBlock = styled.div`
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 0.5rem;
  p {
    margin: 0 0.25rem;
  }
`;

type InfoBlockProps = {
  user: UserStateType;
};

const Info = ({ user }: InfoBlockProps) => {
  return (
    <InfoBlock>
      <p>이름: {user.name}</p>
      <p>성별: {user.gender}</p>
      <p>생년월일: {user.birth.toLocaleString().slice(0, 11)}</p>
      <p>키: {user.height}cm</p>
    </InfoBlock>
  );
};

export default Info;
