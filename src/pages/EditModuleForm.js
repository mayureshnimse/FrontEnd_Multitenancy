import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for getting the module ID from the URL
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

function EditModuleForm() {
  const { moduleId } = useParams(); // Get the module ID from the URL
  const navigate = useNavigate();
  
  
  
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Retrieve the module data when the component mounts
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      // Handle the case when the token is not found, e.g., redirect to login
      navigate('/login'); // Replace with your actual login route
      return;
    }

    api.get(`/api/modules/${moduleId}`)
      .then((response) => {
        const moduleData = response.data;

        if (moduleData) {
          // Check if moduleData is not null or undefined
          setModuleName(moduleData.name);
          setModuleDescription(moduleData.description);
        } else {
          // Handle the case when moduleData is empty or not found
          setNotification({
            open: true,
            message: 'Module not found or empty data',
            severity: 'error',
          });
        }
       
        setModuleName(moduleData.name);
        setModuleDescription(moduleData.description);
      })
      .catch((error) => {
        console.error('Error fetching module data:', error);
        setNotification({
          open: true,
          message: 'Error fetching module data',
          severity: 'error',
        });
      });
  }, [moduleId, navigate]);

  const handleModuleEdit = () => {
    const data = {
      name: moduleName,
      description: moduleDescription,
    };

    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      navigate('/login'); // Replace with your actual login route
      return;
    }

    api.put(`/api/modules/${moduleId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log('Module edited successfully:', response.data);
        setNotification({
          open: true,
          message: 'Module edited successfully',
          severity: 'success',
        });
        navigate(`/superadmin/modules`);
      })
      .catch((error) => {
        console.error('Error editing module:', error);
        setNotification({
          open: true,
          message: 'Error editing module',
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
          <Typography variant="h6">Edit Module</Typography>
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
            onClick={handleModuleEdit}
          >
            Save Changes
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default EditModuleForm;
