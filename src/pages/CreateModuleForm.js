import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  TextField,
  Button,
} from '@mui/material';
import api from '../api';

function CreateModuleForm() {
  const navigate = useNavigate();
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleModuleCreate = () => {
    const data = {
      name: moduleName,
      description: moduleDescription,
    };

    // Retrieve the JWT token from local storage when the component mounts
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      // Handle the case when the token is not found, e.g., redirect to login
      navigate('/login'); // Replace with your actual login route
      return;
    }

     // Log the token to the console for debugging
  console.log('Check Token:', jwtToken);

    // Make a POST request to the backend's /create route with the JWT token
    api.post('/api/modules/create', data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log('Module created successfully:', response.data);
        setNotification({
          open: true,
          message: 'Module created successfully',
          severity: 'success',
        });
        navigate('/superadmin/modules');
      })
      .catch((error) => {
        console.error('Error creating module:', error);
        setNotification({
          open: true,
          message: 'Error creating module',
          severity: 'error',
        });
      });
  };

  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Create Module</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <form>
          <TextField
            label="Module Name"
            fullWidth
            margin="normal"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
          <TextField
            label="Module Description"
            fullWidth
            margin="normal"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleModuleCreate}
          >
            Create
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CreateModuleForm;


