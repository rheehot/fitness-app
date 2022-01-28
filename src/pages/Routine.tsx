import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Template from 'templates/Template';
import { addRoutine, Routine } from 'modules/routine';
import { routineSelector, userSelector } from 'modules/hooks';
import RoutineItem from 'components/RoutineItem';
import AddExercise from 'components/AddExerciseModal';
import { BsPlusCircle } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

const AddRoutineButton = styled.div`
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

const RoutineListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0.5rem;
`;

const RoutinePage = () => {
  const user = useSelector(userSelector);
  const routines = useSelector(routineSelector);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [day, setDay] = useState<number | null>(null);
  const [visible, setVisible] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const onOpenModal = (day: number) => {
    setDay(day);
    setModal(true);
  };
  const onCloseModal = () => setModal(false);
  const onToggleVisible = (id: string) =>
    id !== visible ? setVisible(id) : setVisible(null);
  const onToggleEditing = (id: string) => {
    if (id !== editing) {
      setVisible(id);
      setEditing(id);
    } else {
      setEditing(null);
    }
  };

  return (
    <Template>
      <h1>현재 루틴</h1>
      {user.currentRoutineId ? (
        <RoutineItem
          isCurrent
          routine={
            routines.find((r) => r.id === user.currentRoutineId) as Routine
          }
        />
      ) : (
        <h3>선택된 루틴이 없습니다.</h3>
      )}
      <hr />
      <h1>루틴 목록</h1>
      <AddExercise
        id={editing}
        day={day}
        visible={modal}
        onClose={onCloseModal}
      />
      <RoutineListBlock>
        {routines.map((routine) => (
          <RoutineItem
            routine={routine}
            visible={visible}
            editing={editing}
            onToggleVisible={onToggleVisible}
            onToggleEditing={onToggleEditing}
            onOpenModal={onOpenModal}
            key={routine.id}
          />
        ))}
      </RoutineListBlock>
      <AddRoutineButton>
        <BsPlusCircle
          onClick={() => {
            const id = uuidv4();
            dispatch(
              addRoutine({
                id,
                title: '새 루틴',
                lastModified: Date.now(),
                weekRoutine: [[], [], [], [], [], [], []],
              }),
            );
            onToggleEditing(id);
          }}
        />
        <b>루틴 추가</b>
      </AddRoutineButton>
    </Template>
  );
};

export default RoutinePage;
