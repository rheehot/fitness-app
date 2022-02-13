import React, { useReducer, useState } from 'react';
import styled from '@emotion/styled';
import { setUser, UserStateType } from 'modules/user';
import { FaPencilAlt } from 'react-icons/fa';
import { MdCheck } from 'react-icons/md';
import Button from 'components/common/Button';
import { useDispatch } from 'react-redux';
import AlertModal from 'components/common/AlertModal';
import palette from 'lib/palette';

const InfoBlock = styled.div<{ editing: boolean }>`
  position: relative;
  padding: 0.5rem;
  border: 1px solid
    ${(props) => (props.editing ? palette.green_main : palette.grey_main)};
  border-radius: 0.5rem;
  transition: border 0.2s;
  p {
    margin: 0.25rem 0;
    input {
      max-width: 10rem;
      border: none;
      border-radius: 0.25rem;
      margin-left: 0.25rem;
      background: ${palette.grey_sub};
      font-size: 1rem;
    }
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
  color: ${palette.green_main};
  font-size: 2rem;
  margin: -0.25rem;
`;

type InfoBlockProps = {
  user: UserStateType | null;
};

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

const Info = ({ user }: InfoBlockProps) => {
  const dispatch = useDispatch();

  if (!user) {
    return <h2>사용자 정보가 없습니다.</h2>;
  }

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputState, inputDispatch] = useReducer(reducer, {
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    height: `${user.height}`,
  });
  const onToggleEditing = () => {
    setEditing(!editing);
  };
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

  return (
    <InfoBlock editing={editing}>
      {editing ? (
        <>
          <AlertModal visible={modal} text="입력값을 확인해 주세요." />
          <EditButton onClick={onSubmit}>
            <Button>
              <CheckButton />
            </Button>
          </EditButton>
          <p>
            이름:
            <input
              type="text"
              value={inputState.name}
              onChange={(e) => onChange('NAME', e)}
              maxLength={8}
              required
            />
          </p>
          <p>
            성별:
            <label htmlFor="male">
              <input
                id="male"
                type="radio"
                value="남성"
                checked={inputState.gender === '남성'}
                onChange={onToggleRadio}
              />
              남성
            </label>
            <label htmlFor="female">
              <input
                id="female"
                type="radio"
                value="여성"
                checked={inputState.gender === '여성'}
                onChange={onToggleRadio}
              />
              여성
            </label>
          </p>
          <p>
            생년월일:
            <input
              type="date"
              value={inputState.birth}
              onChange={(e) => onChange('BIRTH', e)}
              placeholder="8자리 숫자 입력"
              required
            />
          </p>
          <p>
            키:
            <input
              type="number"
              value={inputState.height}
              onChange={(e) => onChange('HEIGHT', e)}
              min={100}
              required
            />
            cm
          </p>
        </>
      ) : (
        <>
          <EditButton onClick={onToggleEditing}>
            <Button>
              <FaPencilAlt />
            </Button>
          </EditButton>
          <p>이름: {user.name}</p>
          <p>성별: {user.gender}</p>
          <p>생년월일: {user.birth.toLocaleString().slice(0, 11)}</p>
          <p>키: {user.height}cm</p>
        </>
      )}
    </InfoBlock>
  );
};

export default Info;
