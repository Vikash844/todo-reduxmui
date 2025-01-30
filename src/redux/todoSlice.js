import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    filter: 'all',
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                text:action.payload,
                dateAdded:moment().format('DD/MM/YYYY hh:mm A')
            });
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },

        deleteTask: (state, action) => {
            if (window.confirm("Are You Sure You Delete This Task")) {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
                localStorage.setItem("tasks", JSON.stringify(state.tasks))
            }
        },

        editTask: (state, action) => {
            const { id, newText } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.text.text = newText;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        toggleTaskStatus: (state, action) => {
            const { id, completed } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.completed = completed;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
    },
});

export const { addTask, deleteTask, editTask, setFilter, toggleTaskStatus } = todoSlice.actions;
export default todoSlice.reducer;