import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Images
import slider1 from '../images/slider1.jpg';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';
import slider4 from '../images/slider4.jpg';

const backgroundImages = [slider1, slider2, slider3, slider4];

const CommonPage = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#000', color: '#fff',padding: '1rem 1rem', }}>
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
                                '&:hover': { backgroundColor: '#fd5c63' }
                            }}
                            onClick={() => handleNavigation('/AboutUs')}
                        >
                            About Us
                        </Button>
                        
                      
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#B71C1C',
                                borderColor: '#fff',
                                backgroundColor: '#fff',
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#F8D7DA',
                                    color: '#B71C1C',
                                    borderColor: '#fff'
                                }
                            }}
                            onClick={() => handleNavigation('/Login')}
                        >
                            Admin Login
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '90vh',
                    backgroundImage: `url(${backgroundImages[currentImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#fff',
                    textAlign: 'center',
                    transition: 'background-image 1s ease-in-out'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        zIndex: 1
                    }}
                />
                <Container sx={{ zIndex: 2 }}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Be a Hero. Donate Blood Today.
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Every drop counts. Join us and save lives.
                    </Typography>
                    <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#D32F2F', '&:hover': { backgroundColor: '#b71c1c' } }}
                            onClick={() => handleNavigation('/ClientDashBord')}
                        >
                            Book Appointment
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                '&:hover': { color: '#D32F2F', borderColor: '#D32F2F' }
                            }}
                            onClick={() => handleNavigation('/ClientDashBord')}
                        >
                            How to Donate
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* Info Cards */}
            <Container sx={{ my: 5 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center">
                    <Box sx={{ width: 300, boxShadow: 3, p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Start Your RapidPass
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Donating blood today? Complete your pre-reading and health history questions online before visiting your blood drive location.
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#D32F2F' }}>
                            START NOW
                        </Button>
                    </Box>
                    <Box sx={{ width: 300, boxShadow: 3, p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Am I Eligible to Donate Blood?
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Are you eligible for blood donation? Learn eligibility about health, travel, medications, tattoos, and more.
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#D32F2F' }}>
                            LEARN MORE
                        </Button>
                    </Box>
                    <Box sx={{ width: 300, boxShadow: 3, p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Help Sickle Cell Patients
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                            Blood donors who are Black play a critical role in helping sickle cell disease patients receive the best blood match.
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#D32F2F' }}>
                            LEARN MORE
                        </Button>
                    </Box>
                </Stack>
            </Container>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#333', color: '#fff', py: 4 }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={{ xs: 2, md: 0 }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                    >
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
                        <Box textAlign="center">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                CONTACT DETAILS
                            </Typography>
                            <Typography variant="body2">
                                Phone: +94 11 204 9999<br />
                                Email: info@ninewellshospital.lk
                            </Typography>
                        </Box>
                        <Box textAlign={{ xs: 'center', md: 'right' }}>
                            <Typography variant="body2">
                                &copy; 2025 QuickBlood. All rights reserved.
                            </Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </div>
    );
};

export default CommonPage;
