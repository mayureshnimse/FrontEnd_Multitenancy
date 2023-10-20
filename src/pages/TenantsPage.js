// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import api from '../api';

// function TenantsPage() {
//   const [tenants, setTenants] = useState([]);

//   useEffect(() => {
//     // Make an HTTP request to fetch tenant data from your backend
//     api.get('/api/tenants/') // Replace with your actual API endpoint
//       .then((response) => {
//         setTenants(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching tenants:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Username</th>
//             <th>Description</th>
//             <th>Role</th>
//             {/* Add more table headers for other tenant data */}
//           </tr>
//         </thead>
//         <tbody>
//           {tenants.map((tenant) => (
//             <tr key={tenant._id}>
//               <td>{tenant.name}</td>
//               <td>{tenant.username}</td>
//               <td>{tenant.description}</td>
//               <td>{tenant.role}</td>
//               {/* Render more table cells for other tenant data */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TenantsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog"; // Import the DeleteDialog component
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {  Navigate, useNavigate } from "react-router-dom"; 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TenantsPage() {
  const classes = useStyles();
  const [tenants, setTenants] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Make an HTTP request to fetch tenant data from your backend
    api.get("/api/tenants/") // Replace with your actual API endpoint
      .then((response) => {
        setTenants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tenants:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteTenant = (tenantId) => {
    // Open the delete confirmation dialog
    setTenantToDelete(tenantId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteTenant = () => {
    // Perform the actual module deletion
    api
      .delete(`/api/tenants/${tenantToDelete}`)
      .then((response) => {
        // Remove the deleted module from the state
        setTenants(tenants.filter((tenant) => tenant._id !== tenantToDelete));
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
            Tenant Management
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/superadmin/tenants/create"
          >
            Create New Tenant
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ padding: "30px" }}></Box>
        <div>
          <TableContainer component={Paper}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        background: "lightblue",
                        color: "darkblue",
                        fontWeight: "bold",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        background: "lightblue",
                        color: "darkblue",
                        fontWeight: "bold",
                      }}
                    >
                      Username
                    </TableCell>
                    <TableCell
                      sx={{
                        background: "lightblue",
                        color: "darkblue",
                        fontWeight: "bold",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        background: "lightblue",
                        color: "darkblue",
                        fontWeight: "bold",
                      }}
                    >
                      Role
                    </TableCell>
                    {/* Add more table headers for other tenant data */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tenants.map((tenant) => (
                    <TableRow key={tenant._id}>
                      <TableCell>{tenant.name}</TableCell>
                      <TableCell>{tenant.username}</TableCell>
                      <TableCell>{tenant.description}</TableCell>
                      <TableCell>{tenant.role}</TableCell>
                      {/* Render more table cells for other tenant data */}
                    
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
                          onClick={() => navigate(`/superadmin/tenants/${tenant._id}/edit`)} // Edit route
                        >
                          Edit
                        </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteTenant(tenant._id)}
                        sx={{ width: "100px"}} // Adjust the width as needed
                      >
                        Delete
                      </Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </div>
      </Container>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={confirmDeleteTenant}
      />
    </div>
  );
}

export default TenantsPage;
