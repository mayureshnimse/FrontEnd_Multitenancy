import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api';
// import { useUser } from '../context/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   

    const handleLogin = () => {
        api.post('/api/auth/login', { username, password })
            .then((response) => {

                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                // Handle successful login here
                // You can store the JWT token in a cookie or local storage
                console.log('Login successful', response.data);
                
                // Redirect to the landing page or any other desired page
                // You can use a routing library like react-router-dom
                if (response.data.payload.isSuperadmin) {
                    navigate('/superadmin-dashboard');
                    
                } else if (response.data.payload.isTenant) {
                    navigate('/tenant-dashboard');
                } else if (response.data.payload.isCustomer) {
                    navigate('/customer-dashboard');
                }
       
            })
            .catch((error) => {
                // Handle login error here
                console.error('Login error:', error);
            });
    };
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}
export default Login;