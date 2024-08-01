
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [
    { id: 'task-1', title: "prakash", description: "Willing to Work" },
    { id: 'task-2', title: "ramya", description: "Willing to Collaborate" },
    { id: 'task-3', title: "naidu", description: "Willing to relocate" },
  ],
  inProgress: [
    { id: 'task-4', title: "Brendan Eich", description: "JavaScript was invented by Brendan Eich in 1995" },
    { id: 'task-5', title: "Jordan Walke", description: "React was created by Jordan Walke" },
    { id: 'task-6', title: "James Gosling", description: "Java was originally developed by James Gosling" },
  ],
  peerReview: [
    { id: 'task-7', title: "SoftwareEngineer", description: "Deals with the design, development, testing" },
    { id: 'task-8', title: "FullStackDeveloper", description: "Front end and the back end of a website" },
  ],
  done: [
    { id: 'task-9', title: "Carrers", description: "JavaScript was career development" },
    { id: 'task-10', title: "AboutUs", description: "our About the person" },
    { id: 'task-11', title: "PrivacyPolicy", description: "persons will choose privacy" },
  ],
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { source, destination } = action.payload;

      if (!destination) return;

      const sourceColumn = state[source.droppableId];
      const destColumn = state[destination.droppableId];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      destColumn.splice(destination.index, 0, movedTask);
    },
    addTask: (state, action) => {
      const { columnId, title, description } = action.payload;
      if (state[columnId]) {
        state[columnId].push({
          id: new Date().toISOString(), // Use a more reliable ID in production
          title,
          description,
        });
      } else {
        console.error(`Column with ID '${columnId}' not found.`);
      }
    },
  },
});

export const { moveTask,addTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
