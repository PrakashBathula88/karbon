import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './TasksSlice';

const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});

export default store;