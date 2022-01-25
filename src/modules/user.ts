import { createSlice } from '@reduxjs/toolkit';
import { Routine } from './routine';

export type UserStateType = {
  name: string;
  gender: string;
  birth: string;
  height: number;
  currentRoutineId: string | null;
  completeDays: string[];
};

const initialState: UserStateType = {
  name: '사용자',
  gender: '남성',
  birth: '1999-04-30',
  height: 172,
  currentRoutineId: null,
  completeDays: ['2022-01-22', '2022-01-23', '2022-01-24', '2022-01-25'],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, { payload: { name, gender, birth, height } }) => {
      state.name = name;
      state.birth = birth;
      state.gender = gender;
      state.height = height;
    },
    setCurrentRoutine: (state, { payload }: { payload: string | null }) => {
      state.currentRoutineId = payload;
    },
  },
});

export const { setUser, setCurrentRoutine } = userSlice.actions;

export default userSlice.reducer;
