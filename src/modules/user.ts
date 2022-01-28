import { createSlice } from '@reduxjs/toolkit';

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
  completeDays: [
    '2022-01-23',
    '2022-01-24',
    '2022-01-25',
    '2022-01-26',
    '2022-01-27',
  ],
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
    addCompleteDay: (state, { payload }: { payload: string }) => {
      state.completeDays.push(payload);
    },
  },
});

export const { setUser, setCurrentRoutine, addCompleteDay } = userSlice.actions;

export default userSlice.reducer;
