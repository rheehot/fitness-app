import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import routine from './routine';

const store = configureStore({
  reducer: {
    user,
    routine,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
