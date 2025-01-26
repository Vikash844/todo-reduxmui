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
} from '@mui/material';
import React, { useState } from 'react';
import { deleteTask, editTask } from '../redux/todoSlice';
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
                marginBottom={3}
                color="primary"
                fontWeight="bold"
            >
                Task List
            </Typography>
            {filteredTasks.length === 0 ? (
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    No tasks to display!
                </Typography>
            ) : (
                <List>
                    {filteredTasks.map((task) => (
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        flexGrow: 1,
                                    }}
                                >
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
                                    primary={task.text}
                                    primaryTypographyProps={{
                                        style: {
                                            textDecoration: task.completed
                                                ? 'line-through'
                                                : 'none',
                                            color: task.completed ? 'gray' : 'inherit',
                                        },
                                    }}
                                />
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                    edge="end"
                                    onClick={() => dispatch(deleteTask(task.id))}
                                    color="error"
                                >
                                    <MdDelete />
                                </IconButton>
                                {editId !== task.id && (
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleEdit(task.id, task.text)}
                                        color="primary"
                                    >
                                        <CiEdit />
                                    </IconButton>
                                )}
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default TodoList;
