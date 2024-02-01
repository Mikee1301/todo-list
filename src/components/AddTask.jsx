import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Task } from '@mui/icons-material';

function AddTask({ open, onClose, onAddTask }) {
    const [newTask, setNewTask] = useState({
        taskTitle: '',
        taskDescription: ''

    });
    
    const handleAddTask = () => { 
        onAddTask(newTask);
        setNewTask('');
        onClose();
    }
    const updateValues = (propertyName, value) => {
        setNewTask({
            ...newTask,
            [propertyName]: value,
        });
    }
    return (
        <Dialog 
        open={open} onClose={onClose}>
            <DialogTitle>New task</DialogTitle>
            <DialogContent 
                sx={{
                    width: '500px',
                    display: 'flex',
                    flexDirection: 'column'

                }}
            >
            <TextField
                sx = {{
                    margin: '10px 0'
                }}
                label="New Task"
                variant="outlined"
                value={newTask.taskTitle || ''}
                onChange={(e) => updateValues('taskTitle',e.target.value)}
            />
            <TextField
              sx = {{
                marginTop: "15px"
              }}
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={newTask.taskDescription || ''}
              onChange={(e) => updateValues('taskDescription',e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                Close
            </Button>
            <Button onClick={handleAddTask} color="primary">
                Create
            </Button>
            </DialogActions>
        </Dialog>
    )
}
export default AddTask;