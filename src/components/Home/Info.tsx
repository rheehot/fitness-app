import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { setUser, UserStateType } from 'modules/user';
import { FaPencilAlt } from 'react-icons/fa';
import { MdCheck } from 'react-icons/md';
import Button from 'components/common/Button';
import AlertModal from 'components/common/AlertModal';
import { getDatestr } from 'lib/methods';

const InfoBlock = styled.div<{ editing: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 8rem;
  padding: 0.5rem;
  border: 1px solid
    ${({ editing, theme }) => (editing ? theme.primary : theme.border_main)};
  border-radius: 0.5rem;
  transition: border 0.2s;
  input {
    max-width: 9rem;
    border: none;
    border-radius: 0.25rem;
    margin-left: 0.25rem;
    font-size: 1rem;
  }
`;

const EditButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  margin: 0;
  font-size: 1.5rem;
`;

const CheckButton = styled(MdCheck)`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  margin: -0.25rem;
`;

type InputState = {
  name: string;
  gender: string;
  birth: string;
  height: string;
};

type InputAction = {
  type: string;
  payload: string;
};

const reducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case 'NAME':
      return { ...state, name: action.payload };
    case 'GENDER':
      return { ...state, gender: action.payload };
    case 'BIRTH':
      return { ...state, birth: action.payload };
    case 'HEIGHT':
      return { ...state, height: action.payload };
    default:
      return state;
  }
};

type InfoBlockProps = {
  user: UserStateType;
};

const Info = ({ user }: InfoBlockProps) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputState, inputDispatch] = useReducer(reducer, {
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    height: `${user.height}`,
  });
  const onToggleEditing = () => setEditing(!editing);
  const onChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'HEIGHT' && e.target.value.length > 3) return;
    inputDispatch({
      type,
      payload: e.target.value,
    });
  };
  const onToggleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({ type: 'GENDER', payload: e.target.value });
  };
  const onSubmit = () => {
    if (
      !inputState.name ||
      !inputState.gender ||
      inputState.birth.length < 8 ||
      !inputState.height
    ) {
      setModal(true);
      setTimeout(() => setModal(false), 2000);
      return;
    }
    dispatch(
      setUser({
        name: inputState.name,
        gender: inputState.gender,
        birth: inputState.birth,
        height: +inputState.height,
      }),
    );
    onToggleEditing();
  };

  useEffect(() => {
    inputDispatch({ type: 'NAME', payload: user.name });
    inputDispatch({ type: 'BIRTH', payload: user.birth });
    inputDispatch({ type: 'GENDER', payload: user.gender });
    inputDispatch({ type: 'HEIGHT', payload: `${user.height}` });
  }, [user]);

  return (
    <InfoBlock editing={editing}>
      {editing ? (
        <>
          <AlertModal visible={modal} text="???????????? ????????? ?????????." />
          <EditButton onClick={onSubmit}>
            <Button>
              <CheckButton />
            </Button>
          </EditButton>
          <div>
            ??????:
            <input
              type="text"
              value={inputState.name}
              onChange={(e) => onChange('NAME', e)}
              maxLength={8}
              required
            />
          </div>
          <div>
            ??????:
            <label htmlFor="male">
              <input
                id="male"
                type="radio"
                value="??????"
                checked={inputState.gender === '??????'}
                onChange={onToggleRadio}
              />
              ??????
            </label>
            <label htmlFor="female">
              <input
                id="female"
                type="radio"
                value="??????"
                checked={inputState.gender === '??????'}
                onChange={onToggleRadio}
              />
              ??????
            </label>
          </div>
          <div>
            ????????????:
            <input
              type="date"
              value={inputState.birth}
              onChange={(e) => onChange('BIRTH', e)}
              min="1900-01-01"
              max={getDatestr(new Date())}
              required
            />
          </div>
          <div>
            ???:
            <input
              type="number"
              value={inputState.height}
              onChange={(e) => onChange('HEIGHT', e)}
              min={100}
              max={300}
              required
            />
            cm
          </div>
        </>
      ) : (
        <>
          <EditButton onClick={onToggleEditing}>
            <Button>
              <FaPencilAlt />
            </Button>
          </EditButton>
          <div>??????: {user.name}</div>
          <div>??????: {user.gender}</div>
          <div>????????????: {user.birth.toLocaleString().slice(0, 11)}</div>
          <div>???: {user.height}cm</div>
        </>
      )}
    </InfoBlock>
  );
};

export default Info;
