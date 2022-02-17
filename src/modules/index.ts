import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, REGISTER, PERSIST, REHYDRATE } from 'redux-persist';
import user from './user';
import routine from './routine';
import perform from './perform';

const reducers = combineReducers({
  user,
  routine,
  perform,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, PERSIST, REHYDRATE],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
