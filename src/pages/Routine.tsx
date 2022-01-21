import React, { useState } from 'react';
import Template from 'templates/Template';
import styled from '@emotion/styled';
import { BsPlusCircle } from 'react-icons/bs';
import { addRoutine } from 'modules/routine';
import { v4 as uuidv4 } from 'uuid';
import RoutineList from 'components/RoutineList';
import { useDispatch } from 'react-redux';

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

const RoutinePage = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
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
      <h1>루틴 목록</h1>
      <RoutineList
        visible={visible}
        editing={editing}
        onToggleVisible={onToggleVisible}
        onToggleEditing={onToggleEditing}
      />
      <AddRoutineButton>
        <BsPlusCircle
          onClick={() => {
            const id = uuidv4();
            dispatch(
              addRoutine({
                id,
                title: '새 루틴',
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
