import React from 'react';
import Template from 'templates/Template';
import Info from 'components/Info';
import { useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';
import styled from '@emotion/styled';

const PerformListBlock = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 0.5rem;
  overflow: hidden;
  li + li {
  }
  li:nth-of-type(1) {
    color: red;
  }
  li:nth-of-type(7) {
    color: blue;
  }
`;

const PerformItemBlock = styled.li<{ done?: boolean }>`
  display: flex;
  justify-content: center;
  background: ${(props) => (props.done ? '#00ffb3' : '#eeeeee')};
  font-weight: bold;
`;

const Home = () => {
  const user = useSelector(userSelector);

  return (
    <Template>
      <h1>안녕하세요, {user.name}님!</h1>
      <Info user={user}></Info>
      <h2>이번 주 운동 현황</h2>
      <PerformListBlock>
        <PerformItemBlock done>일</PerformItemBlock>
        <PerformItemBlock done>월</PerformItemBlock>
        <PerformItemBlock done>화</PerformItemBlock>
        <PerformItemBlock>수</PerformItemBlock>
        <PerformItemBlock>목</PerformItemBlock>
        <PerformItemBlock>금</PerformItemBlock>
        <PerformItemBlock>토</PerformItemBlock>
      </PerformListBlock>
    </Template>
  );
};

export default Home;
