import { createSlice } from '@reduxjs/toolkit';

export type UserStateType = {
  name: string;
  gender: string;
  birth: Date;
  height: number;
};

const initialState: UserStateType = {
  name: '사용자',
  gender: '미정',
  birth: new Date(1999, 3, 30),
  height: 168,
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
