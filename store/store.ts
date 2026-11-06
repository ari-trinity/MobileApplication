// bring in the store builder & the task notebook
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

// the one notebook for the whole app
export const store = configureStore({
  reducer: {
    task: taskReducer, // keep the task facts here
  },
});

// types that help the pages read the notebook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;