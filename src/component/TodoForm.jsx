import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/todoSlice';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = () => {
    const [task, setTask] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        dispatch(addTask({ id: uuidv4(), text: task, completed: false }));
        setTask('');
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 3,
                maxWidth: 400,
                margin: '0 auto',
                marginTop: 5,
                borderRadius: 2,
            }}
        >
            <Typography
                variant="h5"
                textAlign="center"
                marginBottom={2}
                color="primary"
                fontWeight="bold"
            >
                Add a New Task
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField
                    label="New Task"
                    variant="outlined"
                    value={task}
                    fullWidth
                    onChange={(e) => setTask(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ textTransform: 'none' }}
                >
                    Add Task
                </Button>
            </Box>
        </Paper>
    );
};

export default TodoForm;
