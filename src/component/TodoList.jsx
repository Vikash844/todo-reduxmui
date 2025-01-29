import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Box,
    Paper,
    ToggleButtonGroup,
    ToggleButton,
    Select,
    MenuItem
} from '@mui/material';
import React, { useState } from 'react';
import { deleteTask, editTask, setFilter, toggleTaskStatus } from '../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

const TodoList = () => {
    const { tasks, filter } = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [newText, setNewText] = useState('');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    const handleEdit = (id, text) => {
        setEditId(id);
        setNewText(text);
    };

    const saveEdit = (id) => {
        dispatch(editTask({ id, newText }));
        setEditId(null);
        setNewText('');
    };

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            dispatch(setFilter(newFilter));
        }
    };

    const handleStatusChange = (id, completed) => {
        dispatch(toggleTaskStatus({ id, completed }));
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 3,
                maxWidth: 500,
                margin: '0 auto',
                marginTop: 1,
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
                Task List
            </Typography>

            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                aria-label="task filter"
                sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}
            >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="active">Active</ToggleButton>
                <ToggleButton value="completed">Completed</ToggleButton>
            </ToggleButtonGroup>

            {filteredTasks.length === 0 ? (
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    No tasks to display!
                </Typography>
            ) : (
                <List>
                    {
                        console.log(filteredTasks)
                    }
                    {filteredTasks.map((task)    => (
                        <ListItem
                            key={task.id}
                            divider
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                paddingY: 1.5,
                            }}
                        >
                            {editId === task.id ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                                    <TextField
                                        value={newText}
                                        onChange={(e) => setNewText(e.target.value)}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Button
                                        onClick={() => saveEdit(task.id)}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        Save
                                    </Button>
                                </Box>
                            ) : (
                                <ListItemText
                                    primary={String(task.text.text)}
                                    secondary={`Added on: ${task.dateAdded}`}
                                primaryTypographyProps={{
                                    style: {
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? 'gray' : 'inherit',
                                    },
                                }}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                                />
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Select
                                    value={task.completed ? 'completed' : 'active'}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value === 'completed')}
                                    size="small"
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>
                                {editId !== task.id && (
                                    <IconButton edge="end" onClick={() => handleEdit(task.id, task.text)} color="primary">
                                        <CiEdit />
                                    </IconButton>
                                )}
                                <IconButton edge="end" onClick={() => dispatch(deleteTask(task.id))} color="error">
                                    <MdDelete />
                                </IconButton>

                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default TodoList;
