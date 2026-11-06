// bring in the redux tools
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// the facts the notebook remembers
type TaskState = {
  progress: string; // the percent line
  message: string; // the sentence at the top
};

// the starting words
const initialState: TaskState = {
  progress: 'Progress: not started',
  message: 'This is the home screen.',
};

// the actions that change the notebook
const taskSlice = createSlice({
  name: 'task', // the notebook section name
  initialState, // the starting words
  reducers: {
    // replace the progress line
    setProgress(state, action: PayloadAction<string>) {
      state.progress = action.payload;
    },
    // replace the top sentence
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
});

// share the actions & the reducer
export const { setProgress, setMessage } = taskSlice.actions;
export default taskSlice.reducer;