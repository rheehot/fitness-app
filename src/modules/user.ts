import { createSlice } from '@reduxjs/toolkit';

export type UserStateType = {
  name: string;
  gender: string;
  birth: string;
  height: number;
};

const initialState: UserStateType = {
  name: '사용자',
  gender: '미정',
  birth: '1999-04-30',
  height: 171,
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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
