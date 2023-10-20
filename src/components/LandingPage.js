// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Button, Typography, Container, Grid, Grow } from '@mui/material';
// function LandingPage() {
//     const [modules, setModules] = useState([]);
//     useEffect(() => {
//         axios.get('http://localhost:5000/api/modules/')
//             .then((response) => {
//                 setModules(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching modules:', error);
//             });
//     }, []);
//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Welcome to Multi-Tenancy App Landing Page
//             </Typography>
//             <Grid container spacing={2}>
//                 {modules.map((module) => (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={module._id}>
//                         <Grow in={true} timeout={1000}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h5" component="div">
//                                         {module.name}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {module.description}
//                                     </Typography>
//                                     <Button variant="contained" color="primary">
//                                         View Details
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grow>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// }
// export default LandingPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Button, Typography, Container, Grid, Grow } from '@mui/material';

// function LandingPage() {
//     const [modules, setModules] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/modules/')
//             .then((response) => {
//                 setModules(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching modules:', error);
//             });
//     }, []);

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Welcome to Multi-Tenancy App Landing Page
//             </Typography>

//             {/* Login and Signup Buttons */}
//             <Button variant="contained" color="primary">
//                 Login
//             </Button>
//             <Button variant="contained" color="secondary">
//                 Signup
//             </Button>

//             <Grid container spacing={2}>
//                 {modules.map((module) => (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={module._id}>
//                         <Grow in={true} timeout={1000}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h5" component="div">
//                                         {module.name}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {module.description}
//                                     </Typography>
//                                     <Button variant="contained" color="primary">
//                                         View Details
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grow>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// }

// export default LandingPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Typography, Container, Grid, Grow, Box } from '@mui/material';
import Navbar from './Navbar'; // Import the Navbar component

function LandingPage() {
    const [modules, setModules] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/modules/')
            .then((response) => {
                setModules(response.data);
            })
            .catch((error) => {
                console.error('Error fetching modules:', error);
            });
    }, []);

    return (
        <div>
            <Navbar /> {/* Include the Navbar component at the top of the page */}
            <Box sx={{ padding: '30px' }}></Box>
            <Container>
                <Grid container spacing={2}>
                    {modules.map((module) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={module._id}>
                            <Grow in={true} timeout={1000}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {module.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {module.description}
                                        </Typography>
                                        <Button variant="contained" color="primary">
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default LandingPage;

