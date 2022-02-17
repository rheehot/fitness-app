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
  name: '',
  gender: '',
  birth: '',
  height: 0,
  currentRoutine: null,
  completes: [],
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
          currentRoutine?: Routine | null;
          completes?: CompleteItem[];
        };
      },
    ) => {
      state.name = payload.name;
      state.birth = payload.birth;
      state.gender = payload.gender;
      state.height = payload.height;
      if (payload.currentRoutine) state.currentRoutine = payload.currentRoutine;
      if (payload.completes) state.completes = payload.completes;
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
