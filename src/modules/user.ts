import { createSlice } from '@reduxjs/toolkit';
import { Routine } from './routine';

export type UserStateType = {
  name: string;
  gender: string;
  birth: string;
  height: number;
  currentRoutine: Routine | null;
  completeDays: string[];
};

const initialState: UserStateType = {
  name: '사용자',
  gender: '남성',
  birth: '1999-04-30',
  height: 172,
  currentRoutine: null,
  completeDays: ['2022-01-30'],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (
      state,
      {
        payload,
      }: {
        payload: {
          name: string;
          gender: string;
          birth: string;
          height: number;
        };
      },
    ) => {
      state.name = payload.name;
      state.birth = payload.birth;
      state.gender = payload.gender;
      state.height = payload.height;
    },
    setCurrentRoutine: (state, { payload }: { payload: Routine | null }) => {
      state.currentRoutine = payload;
    },
    addCompleteDay: (state, { payload }: { payload: string }) => {
      state.completeDays.push(payload);
    },
  },
});

export const { setUser, setCurrentRoutine, addCompleteDay } = userSlice.actions;

export default userSlice.reducer;
