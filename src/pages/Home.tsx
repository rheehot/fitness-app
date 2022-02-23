import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { userSelector } from 'modules/hooks';
import Template from 'templates/Template';
import Info from 'components/Home/Info';
import PerformRoutine from 'components/Home/PerformRoutine';
import { getDatestr, getWeekDate } from 'lib/methods';

const PerformListBlock = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 0.5rem;
  overflow: hidden;
  li:nth-of-type(1) {
    color: ${(props) => props.theme.red};
  }
  li:nth-of-type(7) {
    color: ${(props) => props.theme.blue};
  }
`;

const PerformItemBlock = styled.li<{ done?: boolean }>`
  display: flex;
  justify-content: center;
  background: ${(props) =>
    props.done
      ? (props) => props.theme.highlight_main
      : (props) => props.theme.background_sub};
  font-weight: bold;
`;

const CompleteText = styled.div`
  display: flex;
  place-items: center;
  span {
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    background: ${(props) => props.theme.yellow};
    font-weight: bold;
  }
`;

const NoUserBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  h3,
  p {
    margin: 0;
  }
`;

const HomePage = () => {
  const user = useSelector(userSelector);
  const weekDate = getWeekDate(new Date());
  const isCompleted = useMemo(
    () =>
      user.completes.filter((c) => c.date === getDatestr(new Date())).length >
      0,
    [user.completes],
  );

  return (
    <Template>
      {user.name ? (
        <h1>안녕하세요, {user.name}님!</h1>
      ) : (
        <NoUserBlock>
          <h3>사용자 정보가 없습니다.</h3>
          <p>
            우측의 <b>편집</b> 아이콘을 눌러 정보를 입력해주세요.
          </p>
        </NoUserBlock>
      )}
      <Info user={user}></Info>
      <h1>이번 주 운동 현황</h1>
      <PerformListBlock>
        {weekDate.map((w) =>
          user.completes.filter((c) => c.date === getDatestr(w)).length ? (
            <PerformItemBlock done key={w.getDay()}>
              {w.getDate()}
            </PerformItemBlock>
          ) : (
            <PerformItemBlock key={w.getDay()}>{w.getDate()}</PerformItemBlock>
          ),
        )}
      </PerformListBlock>
      <CompleteText>
        <h1>오늘의 운동</h1>
        {isCompleted ? <span>완료</span> : null}
      </CompleteText>
      <PerformRoutine
        currentRoutine={user.currentRoutine}
        complete={isCompleted}
      />
    </Template>
  );
};

export default HomePage;
