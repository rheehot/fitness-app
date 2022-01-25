import React from 'react';
import Template from 'templates/Template';
import Info from 'components/Info';
import { useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';
import styled from '@emotion/styled';
import { convertDateToStr, getWeekDate } from 'lib/methods';

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

const PerformItemBlock = styled.li<{ done?: string }>`
  display: flex;
  justify-content: center;
  background: ${(props) =>
    props.done === 'fulfilled' ? '#00ffb3' : '#eeeeee'};
  font-weight: bold;
`;

const Home = () => {
  const user = useSelector(userSelector);
  const weekDate = getWeekDate(Date());

  return (
    <Template>
      <h1>안녕하세요, {user.name}님!</h1>
      <Info user={user}></Info>
      <h2>이번 주 운동 현황</h2>
      <PerformListBlock>
        {weekDate.map((w) => {
          if (w < new Date()) {
            if (user.completeDays.indexOf(convertDateToStr(w)) > -1) {
              return (
                <PerformItemBlock done="fulfilled">
                  {w.getDate()}일
                </PerformItemBlock>
              );
            }
            return (
              <PerformItemBlock done="unfulfilled">
                {w.getDate()}일
              </PerformItemBlock>
            );
          }
          return <PerformItemBlock>{w.getDate()}일</PerformItemBlock>;
        })}
      </PerformListBlock>
    </Template>
  );
};

export default Home;
