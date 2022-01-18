import { createSlice } from '@reduxjs/toolkit';

export type UserStateType = {
  name: string;
  gender: string;
  birth: Date;
  height: number;
};

const initialState: UserStateType = {
  name: '만두',
  gender: '남성',
  birth: new Date(1999, 3, 30),
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
