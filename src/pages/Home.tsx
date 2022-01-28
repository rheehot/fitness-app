import React from 'react';
import Template from 'templates/Template';
import Info from 'components/Info';
import { useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';
import styled from '@emotion/styled';
import { convertDateToStr, getWeekDate } from 'lib/methods';
import PerformRoutine from 'components/PerformRoutine';

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

const CompleteText = styled.div`
  display: flex;
  place-items: center;
  span {
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    background: #ffe600;
    font-weight: bold;
  }
`;

const Home = () => {
  const user = useSelector(userSelector);
  const weekDate = getWeekDate(Date());

  return (
    <Template>
      <h1>안녕하세요, {user.name}님!</h1>
      <Info user={user}></Info>
      <h1>이번 주 운동 현황</h1>
      <PerformListBlock>
        {weekDate.map((w) => {
          if (w < new Date()) {
            if (user.completeDays.indexOf(convertDateToStr(w)) > -1) {
              return (
                <PerformItemBlock done="fulfilled" key={w.getDay()}>
                  {w.getDate()}일
                </PerformItemBlock>
              );
            }
            return (
              <PerformItemBlock done="unfulfilled" key={w.getDay()}>
                {w.getDate()}일
              </PerformItemBlock>
            );
          }
          return (
            <PerformItemBlock key={w.getDay()}>
              {w.getDate()}일
            </PerformItemBlock>
          );
        })}
      </PerformListBlock>
      <CompleteText>
        <h1>오늘의 운동</h1>
        {user.completeDays.indexOf(convertDateToStr(new Date())) > -1 && (
          <span>완료</span>
        )}
      </CompleteText>
      <PerformRoutine
        id={user.currentRoutineId}
        todayCompleted={
          user.completeDays.indexOf(convertDateToStr(new Date())) > -1
        }
      />
    </Template>
  );
};

export default Home;
