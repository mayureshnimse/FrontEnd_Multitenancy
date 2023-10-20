import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                       <h2> Multi-Tenancy App</h2>
                    </Typography>
                    <Link to="/login">
                    <Button color="secondary" variant='contained'>Login</Button>
                    </Link>
                    <Button color="secondary" variant='filled'>Signup</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
