import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditTask from './EditTask';
import AddTask from './AddTask';

export default function Types() {
  const [isDialogNewOpenTask, setIsDialogNewOpenTask] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [newTask, setNewTask] = React.useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState();
  const [isDialogEditOpenTask, setIsDialogEditOpenTask] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [selectedItemTitle, setSelectedItemTitle] = React.useState(null);
  const [selectedItemStatus, setSelectedItemStatus] = React.useState(null);
  const [selectedItemDescription, setSelectedItemDescription] = React.useState(null);
  const [viewPrevTask, setPrevTask] = React.useState({
      title: '',
      status: '',
      description: ''
  });

  const handelOpenEditTask = (itemId, itemTitle, itemStatus, itemDescription) => {
    setPrevTask({
      title: itemTitle,
      status: itemStatus,
      description: itemDescription
    })
    setSelectedItemId(itemId);
    setSelectedItemTitle(itemTitle);
    setSelectedItemStatus(itemStatus);
    setSelectedItemDescription(itemDescription);
    setIsDialogEditOpenTask(true);
  };

  const handelCloseEditTask = () => {
    setSelectedItemId(null);
    setIsDialogEditOpenTask(false);
  };
  const handleEditItem = (editedTask) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === selectedItemId) {
          return { ...item, title: editedTask.title, status: editedTask.status, description: editedTask.description };
        }
        return item;
      });
    });
  };
  //Add Task
  const handleOpenAddTask = () => {
    setIsDialogNewOpenTask(true);
  };
  const handleCloseAddTask = () => {
    setIsDialogNewOpenTask(false);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setAlertContent('Task deleted successfully')
    setIsSnackbarOpen(true);
  };
  const handleAddTask = (newTask) => {
    if (newTask.taskTitle.trim() !== '') {
      const newTaskItem = {
        id: Date.now(),
        title: newTask.taskTitle,
        status: 'Todo',
        description: newTask.taskDescription
      };
      setItems([...items, newTaskItem]);
      setNewTask('');
      handleCloseAddTask();
      setAlertContent('Task added successfully')
      setIsSnackbarOpen(true);
      
    }
  };
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  return (
    <Box sx={{ 
          width: '750px',
          height: '600px',
          padding: '10px', 
          maxWidth: 500,
          backgroundColor: '#233c4f'
        }}>
      <h1 className='title'>TODO LIST</h1>
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />
      </div>
      <ul className='list' style={{ overflowY: 'auto', maxHeight: '400px' }}>
      {items.map((item) => (
        <li key={item.id}>
          <span className="list-text">{item.title}</span>
          {/* <span className="list-text">{item.status}</span> */}
          <span className="list-icon">
                <EditIcon onClick={() => handelOpenEditTask(item.id, item.title, item.status, item.description)}/>
                <DeleteIcon onClick={() => handleDeleteItem(item.id)}/>
          </span>
        </li>
        ))}
        
      </ul>
      <Button 
        sx = {{
          width: '90%',
          marginTop: '15px'
        }}
        variant="contained"
        onClick={handleOpenAddTask}
        >
          New task
      </Button>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {alertContent}
        </MuiAlert>
      </Snackbar>
      <AddTask 
        open={isDialogNewOpenTask}
        onClose={handleCloseAddTask}
        onAddTask={handleAddTask}
      />
      <EditTask
        open={isDialogEditOpenTask}
        onClose={handelCloseEditTask}
        onEditTask={handleEditItem}
        prevTask={viewPrevTask}
      />
    </Box>
  );
}