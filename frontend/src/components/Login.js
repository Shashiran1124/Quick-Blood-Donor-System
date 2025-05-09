import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack, Container, TextField, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sideImage from '../images/login.jpg'; // ✅ same image path

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: email,
                password: password
            });
            //alert(response.data.message);
            navigate('/admin-dashbord');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* HEADER */}
            <AppBar position="static" sx={{ backgroundColor: '#B71C1C', color: '#fff' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
                        QuickBlood
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#9a1212' }
                            }}
                            onClick={() => handleNavigation('/CommonPage')}
                        >
                            Home
                        </Button>
                      
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* LOGIN CONTENT */}
            <Box sx={{ flexGrow: 1, backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5 }}>
                <Container maxWidth="md">
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        {/* LEFT IMAGE */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={sideImage} alt="Login illustration" style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        </Grid>

                        {/* LOGIN FORM */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={4} sx={{
                                p: 4,
                                borderRadius: '12px',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                            }}>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                                    Admin Login
                                </Typography>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 3,
                                        backgroundColor: '#D32F2F',
                                        '&:hover': { backgroundColor: '#b71c1c' },
                                        fontWeight: 600
                                    }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* FOOTER */}
            <Box sx={{ backgroundColor: '#333', color: '#fff', py: 4 }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={{ xs: 2, md: 0 }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                    >
                        {/* Left: Address */}
                        <Box textAlign={{ xs: 'center', md: 'left' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                ADDRESS
                            </Typography>
                            <Typography variant="body2">
                                Ninewells Hospital (Pvt) Ltd<br />
                                55/1, Kirimandala Mawatha,<br />
                                Narahenpita, Colombo 05
                            </Typography>
                        </Box>

                        {/* Center: Contact */}
                        <Box textAlign="center">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                CONTACT DETAILS
                            </Typography>
                            <Typography variant="body2">
                                Phone: +94 11 204 9999<br />
                                Email: info@ninewellshospital.lk
                            </Typography>
                        </Box>

                        {/* Right: Copyright */}
                        <Box textAlign={{ xs: 'center', md: 'right' }}>
                            <Typography variant="body2">
                                &copy; 2025 QuickBlood. All rights reserved.
                            </Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default LoginPage;
