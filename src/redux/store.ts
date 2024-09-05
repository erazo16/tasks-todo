import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks/tasks';

export const store = configureStore({
  reducer: {
    tasksAll: tasksReducer,
  },
});

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
