import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { routineSelector } from 'modules/hooks';
import { changeTitle, removeRoutine, addExercise } from 'modules/routine';
import { numToDayOfWeek } from 'lib/methods';
import { BsTriangleFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { MdOutlineEdit, MdCheck, MdRemoveCircleOutline } from 'react-icons/md';
import AddExercise from './AddExercise';

const RoutineListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0.5rem;
`;

const RoutineItem = styled.li<{ visible: boolean; editing: boolean }>`
  height: ${(props) => (props.visible ? '48.5rem' : '2.8rem')};
  overflow: hidden;
  transition: height 0.5s;
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.editing ? '#00ffb3' : '#cccccc')};
  border-radius: 0.5rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      place-items: center;
      font-weight: bold;
      gap: 0.5rem;
    }
    .buttons {
      display: flex;
      place-items: center;
      font-size: 1.75rem;
      cursor: pointer;
    }
  }
`;

const RoutineDetail = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RoutineDetailItem = styled.li<{ editing: boolean }>`
  display: flex;
  place-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${(props) => (props.editing ? '#dcfff5' : '#eeeeee')};
  transition: background 0.5s;
  .day {
    font-weight: bold;
    margin: 0 0.5rem 0 0;
  }
`;

const ExerciseList = styled.ul`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  gap: 0.5rem;
  height: 5rem;
`;

const ExerciseItem = styled.li`
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

const DetailButton = styled(BsTriangleFill)<{ visible: number }>`
  font-size: 1rem;
  cursor: pointer;
  transform: ${(props) => (props.visible ? 'rotate(180deg)' : 'rotate(90deg)')};
  transition: transform 0.25s;
`;

const RemoveRoutineButton = styled(MdRemoveCircleOutline)`
  color: #ffa0a0;
`;

const AddExerciseButton = styled(BsFillPlusCircleFill)`
  display: flex;
  flex-shrink: 0;
  place-items: center;
  padding: 0.5rem;
  font-size: 3rem;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
  &:active {
    opacity: 0.3;
  }
`;

type RoutineListProps = {
  visible: string | null;
  editing: string | null;
  onToggleVisible: (id: string) => void;
  onToggleEditing: (id: string) => void;
};

const RoutineList = ({
  visible,
  editing,
  onToggleVisible,
  onToggleEditing,
}: RoutineListProps) => {
  const routines = useSelector(routineSelector);
  const dispatch = useDispatch();
  const [modalOn, setModalOn] = useState(true);

  return (
    <>
      <AddExercise visible={modalOn} onClose={() => setModalOn(false)} />
      <RoutineListBlock>
        {routines.map((routine) => (
          <RoutineItem
            key={routine.id}
            visible={routine.id === visible}
            editing={routine.id === editing}
          >
            <div className="header">
              <div className="title">
                <DetailButton
                  visible={routine.id === visible ? 1 : 0}
                  onClick={() => onToggleVisible(routine.id)}
                />
                {routine.id === editing ? (
                  <input
                    type="text"
                    value={routine.title}
                    maxLength={10}
                    onChange={(e) =>
                      dispatch(
                        changeTitle({ id: routine.id, value: e.target.value }),
                      )
                    }
                  />
                ) : (
                  routine.title
                )}
              </div>
              <div className="buttons">
                {routine.id === editing ? (
                  <MdCheck
                    onClick={() => onToggleEditing(routine.id)}
                    style={{ color: '#00ffb3' }}
                  />
                ) : (
                  <MdOutlineEdit onClick={() => onToggleEditing(routine.id)} />
                )}
                <RemoveRoutineButton
                  onClick={() => dispatch(removeRoutine(routine.id))}
                />
              </div>
            </div>
            <RoutineDetail>
              {routine.weekRoutine.map((dayRoutine, idx) => (
                <RoutineDetailItem editing={routine.id === editing}>
                  <span className="day">{numToDayOfWeek(idx)}</span>
                  <ExerciseList>
                    {dayRoutine.map((s) => (
                      <ExerciseItem>
                        <b>{s.exercise.name}</b>
                        <span>{s.weight} kg</span>
                        <span>
                          {s.numberOfSets} x {s.numberOfTimes}
                        </span>
                      </ExerciseItem>
                    ))}
                    {routine.id === editing && (
                      <AddExerciseButton
                        onClick={
                          () => setModalOn(true)
                          /* dispatch(
                            addExercise({
                              id: routine.id,
                              day: idx,
                              exercise: {
                                exercise: {
                                  name: '윗몸',
                                  category: '상체',
                                  part: ['배'],
                                },
                                weight: 25,
                                numberOfTimes: 10,
                                numberOfSets: 5,
                              },
                            }),
                          ) */
                        }
                      />
                    )}
                  </ExerciseList>
                </RoutineDetailItem>
              ))}
            </RoutineDetail>
          </RoutineItem>
        ))}
      </RoutineListBlock>
    </>
  );
};

export default RoutineList;
