import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EditTask({ open, onClose, onEditTask, prevTask }) {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskStatus, setTaskStatus] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  useEffect(() => {
    setTaskTitle(prevTask.title || '');
    setTaskStatus(prevTask.status || '');
    setTaskDescription(prevTask.description || '');
  }, [prevTask.title, prevTask.status, prevTask.description]);
  const handleEditTask = () => {
    const editedTask = {
      title: taskTitle,
      status: taskStatus,
      description: taskDescription
    };
    onEditTask(editedTask);
    onClose();
  };

  const handleChange = (event) => {
    setTaskStatus(event.target.value);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent
        sx = {{
          width: '500px'
        }}
      >
        <TextField
          sx={{
            margin: '10px 0',
            width: '100%'
          }}
          label="Title"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskStatus}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Todo">Todo</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
            <TextField
              sx = {{
                marginTop: "15px"
              }}
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleEditTask} color="primary">
          Edit Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTask;
