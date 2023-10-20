// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Button, Typography, Container, Grid, Grow, AppBar, Toolbar, Box, CssBaseline } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import DeleteIcon from '@mui/icons-material/Delete';
// import api from '../api';

// function ModulesPage() {
//     const [modules, setModules] = useState([]);
//     useEffect(() => {
//         // Fetch modules from the backend
//         api.get('/api/modules/') // Replace with your actual API endpoint
//             .then((response) => {
//                 setModules(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching modules:', error);
//             });
//     }, []);

//     const handleDeleteModule = (moduleId) => {
//         api.delete(`/api/modules/${moduleId}`)
//             .then((response) => {
//                 // Remove the deleted module from the state
//                 setModules(modules.filter(module => module._id !== moduleId));
//             })
//             .catch((error) => {
//                 console.error('Error deleting module:', error);
//             });
//     };

//     return (
//         <div>
//             <CssBaseline />
//             <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6" sx={{ flexGrow: 1 }}>Module Management</Typography>
//                     <Button
//                         variant="contained"
//                         color="secondary"
//                         component={Link}
//                         to="/superadmin/modules/create"
//                     >
//                         Create New Module
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//             <Container>
//                 <Box sx={{ padding: '30px' }}></Box>
//                 <div>
//                     <Container>
//                         <Grid container spacing={2}>
//                             {modules.map((module) => (
//                                 <Grid item xs={12} sm={6} md={4} lg={4} key={module._id}>
//                                     <Grow in={true} timeout={1000}>
//                                         <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                             <CardContent>
//                                                 <Typography variant="h5" component="div">
//                                                     {module.name}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {module.description}
//                                                 </Typography>
//                                                 <Button variant="contained" color="primary">
//                                                     View Details
//                                                 </Button>
//                                             </CardContent>
//                                             <Button
//                                                 variant="contained"
//                                                 color="error" // You can adjust the color to match your theme
//                                                 startIcon={<DeleteIcon />}
//                                                 onClick={() => handleDeleteModule(module._id)}
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </Card>
//                                     </Grow>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Container>
//                 </div>
//             </Container>
//         </div>
//     );
// }
// export default ModulesPage;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Grid,
  Grow,
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import DeleteDialog from "./DeleteDialog"; // Import the DeleteDialog component
import VisibilityIcon from "@mui/icons-material/Visibility";
import {  Navigate, useNavigate } from "react-router-dom"; 
import EditIcon from "@mui/icons-material/Edit";

function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    // Fetch modules from the backend
    api
      .get("/api/modules/")
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  const handleDeleteModule = (moduleId) => {
    // Open the delete confirmation dialog
    setModuleToDelete(moduleId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteModule = () => {
    // Perform the actual module deletion
    api
      .delete(`/api/modules/${moduleToDelete}`)
      .then((response) => {
        // Remove the deleted module from the state
        setModules(modules.filter((module) => module._id !== moduleToDelete));
        // Close the delete dialog
        setDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting module:", error);
      });
  };

  const closeDeleteDialog = () => {
    // Close the delete dialog
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Module Management
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/superadmin/modules/create"
          >
            Create New Module
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ padding: "30px" }}></Box>
        <div>
          <Container>
            <Grid container spacing={2}>
              {modules.map((module) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={module._id}>
                  <Grow in={true} timeout={1000}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {module.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {module.description}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary" // Use the desired color
                          size="small"
                          startIcon={<VisibilityIcon />} // Use the "View" icon
                          // Add the onClick function
                        >
                          View
                        </Button>

                        <Button
                          variant="contained"
                          color="success" // Use the desired color
                          size="small"
                          startIcon={<EditIcon />} // Use the "Edit" icon
                          onClick={() => navigate(`/superadmin/modules/${module._id}/edit`)} // Edit route
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteModule(module._id)}
                          sx={{ width: "100px" }} // Adjust the width as needed
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </Container>
      {/* Render the delete confirmation dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={confirmDeleteModule}
      />
    </div>
  );
}

export default ModulesPage;
