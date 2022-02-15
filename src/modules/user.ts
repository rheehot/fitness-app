import { createSlice } from '@reduxjs/toolkit';
import { ExerciseItem } from 'modules/routine';
import { Routine } from './routine';

export type CompleteItem = {
  date: string;
  list: ExerciseItem[];
  memo: string;
};

export type UserStateType = {
  name: string;
  gender: string;
  birth: string;
  height: number;
  currentRoutine: Routine | null;
  completes: CompleteItem[];
};

const initialState: UserStateType = {
  name: '사용자',
  gender: '남성',
  birth: '1999-04-30',
  height: 172,
  currentRoutine: null,
  completes: [
    {
      date: '2022-02-09',
      list: [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfSets: 5,
          numberOfTimes: 12,
        },
      ],
      memo: '그냥 무난하게 했다.',
    },
  ],
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
    addCompleteDay: (state, { payload }: { payload: CompleteItem }) => {
      state.completes.push(payload);
    },
  },
});

export const { setUser, setCurrentRoutine, addCompleteDay } = userSlice.actions;

export default userSlice.reducer;
