import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Template from 'templates/Template';
import { routineSelector } from 'modules/hooks';
import styled from '@emotion/styled';
import { numToDayOfWeek } from 'lib/methods';
import { BsTriangleFill, BsPlusCircle } from 'react-icons/bs';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { addRoutine, removeRoutine } from 'modules/routine';

const RoutineList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0.5rem;
`;

const RoutineItem = styled.li<{ visible: boolean }>`
  height: ${(props) => (props.visible ? '50rem' : '3.5rem')};
  overflow: hidden;
  transition: height 0.5s;
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 0.5rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    .left {
      display: flex;
      place-items: center;
      font-weight: bold;
      gap: 0.5rem;
    }
  }
`;

const RoutineDetail = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const RoutineDetailItem = styled.li`
  display: flex;
  place-items: center;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #eeeeee;
  .day {
    margin: 0 0.5rem 0 0;
  }
`;

const ExerciseList = styled.ul`
  display: flex;
  overflow-x: scroll;
  gap: 0.5rem;
  height: 5rem;
`;

const ExerciseItem = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  place-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: white;
  span {
    font-size: 0.85rem;
  }
`;

const DetailButton = styled(BsTriangleFill)<{ isOpened: boolean }>`
  font-size: 1rem;
  cursor: pointer;
  transform: ${(props) =>
    props.isOpened ? 'rotate(180deg)' : 'rotate(90deg)'};
  transition: transform 0.25s;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
  b {
    font-size: 1rem;
  }
`;

const RemoveButton = styled(MdRemoveCircleOutline)`
  color: #ffa0a0;
  font-size: 1.75rem;
  cursor: pointer;
`;

const Routine = () => {
  const routine = useSelector(routineSelector);

  const [visible, setVisible] = useState(-1);
  const onToggle = (id: number) =>
    id !== visible ? setVisible(id) : setVisible(-1);
  const onAddRoutine = (id: number) => {
    return id;
  };

  return (
    <Template>
      <h1>루틴 목록</h1>
      <RoutineList>
        {routine.map((r) => (
          <RoutineItem key={r.id} visible={r.id === visible}>
            <div className="header">
              <div className="left">
                <DetailButton
                  isOpened={r.id === visible}
                  onClick={() => onToggle(r.id)}
                />
                {r.title}
              </div>
              <RemoveButton onClick={() => removeRoutine(r.id)} />
            </div>
            <RoutineDetail>
              {r.routine.map((m, i) => (
                <RoutineDetailItem>
                  <h3 className="day">{numToDayOfWeek(i)}</h3>
                  <ExerciseList>
                    {m.map((s) => (
                      <ExerciseItem>
                        <b>{s.exercise.name}</b>
                        <span>{s.weight} kg</span>
                        <span>
                          {s.numberOfSets} x {s.numberOfTimes}
                        </span>
                      </ExerciseItem>
                    ))}
                  </ExerciseList>
                </RoutineDetailItem>
              ))}
            </RoutineDetail>
          </RoutineItem>
        ))}
      </RoutineList>
      <AddButton>
        <BsPlusCircle />
        <b>루틴 추가</b>
      </AddButton>
    </Template>
  );
};

export default Routine;
