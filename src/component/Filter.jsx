import { ToggleButton, ToggleButtonGroup, Typography, Box, Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
    const filter = useSelector((state) => state.todos.filter);
    const dispatch = useDispatch();

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            dispatch(setFilter(newFilter));
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 3,
                maxWidth: 400,
                margin: '0 auto',
                marginTop: 1,
                borderRadius: 2,
            }}
        >
            <Typography
                variant="h6"
                textAlign="center"
                color="primary"
                fontWeight="bold"
                marginBottom={1.5}            
            >
                Filter Tasks
            </Typography>
            <Box>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label="task filter"
                    sx={{
                        '& .MuiToggleButton-root': {
                            textTransform: 'none',
                            paddingX: 3,
                            paddingY: 1,
                            marginX: 2,
                            borderRadius: 2,
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                        '& .MuiToggleButton-root:hover': {
                            backgroundColor: 'primary.light',
                        },
                    }}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="active">Active</ToggleButton>
                    <ToggleButton value="completed">Completed</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Paper>
    );
};

export default Filter;
