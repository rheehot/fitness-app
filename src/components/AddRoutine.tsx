import styled from '@emotion/styled';
import React from 'react';

const AddRoutineBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WeekBlock = styled.li`
  display: flex;
  place-items: center;
  div {
    display: flex;
    font-size: 1.25rem;
    margin: 0;
  }
`;

const ExerciseList = styled.ul`
  display: flex;
  flex-grow: 1;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  background: #eeeeee;
  overflow-x: scroll;
`;

const ExerciseItem = styled.li`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 4rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  background: white;
`;

const AddRoutine = () => {
  return (
    <AddRoutineBlock>
      <h2>루틴 추가</h2>
      <WeekBlock>
        <div style={{ color: 'red' }}>일</div>
        <ExerciseList>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>시티드 로우</ExerciseItem>
          <ExerciseItem>암 컬</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
        </ExerciseList>
      </WeekBlock>
      <WeekBlock>
        <div>월</div>
        <ExerciseList>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>랫 풀 다운</ExerciseItem>
          <ExerciseItem>시티드 로우</ExerciseItem>
          <ExerciseItem>암 컬</ExerciseItem>
        </ExerciseList>
      </WeekBlock>
      <WeekBlock>
        <div>화</div>
        <ExerciseList></ExerciseList>
      </WeekBlock>
      <WeekBlock>
        <div>수</div>
        <ExerciseList></ExerciseList>
      </WeekBlock>
      <WeekBlock>
        <div>목</div>
        <ExerciseList></ExerciseList>
      </WeekBlock>
      <WeekBlock>
        <div>금</div>
        <ExerciseList></ExerciseList>
      </WeekBlock>
      <WeekBlock>
        <div style={{ color: 'blue' }}>토</div>
        <ExerciseList></ExerciseList>
      </WeekBlock>
    </AddRoutineBlock>
  );
};

export default AddRoutine;
