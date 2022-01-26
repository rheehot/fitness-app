import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import routine from './routine';
import perform from './perform';

const store = configureStore({
  reducer: {
    user,
    routine,
    perform,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
