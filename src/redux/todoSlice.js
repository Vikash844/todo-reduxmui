import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    filter: 'all',
  };

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },

        editTask: (state, action) => {
            const { id, newText } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.text = newText;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },

        setFilter:(state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTask, deleteTask, editTask, setFilter } = todoSlice.actions;
export default todoSlice.reducer;