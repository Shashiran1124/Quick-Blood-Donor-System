import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ✅ Import hero background image
import heroBg from '../images/client.jpg'; // Make sure your image exists in /images

const ClientDashBord = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* HEADER */}
            <AppBar position="static" sx={{ backgroundColor: '#B71C1C', color: '#fff' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        QuickBlood
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button sx={{ color: '#fff', fontWeight: 600 }} onClick={() => handleNavigation('/CommonPage')}>
                            Home
                        </Button>
                        <Button sx={{ color: '#fff', fontWeight: 600 }} onClick={() => handleNavigation('/AboutUs')}>
                            About Us
                        </Button>
                       
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* HERO SECTION */}
            <Box
                sx={{
                    backgroundImage: `url(${heroBg})`, // ✅ removed gradient, original image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    py: 12
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.3)', // ✅ optional light overlay ONLY behind text (not image-wide)
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Welcome to QuickBlood
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, maxWidth: 600 }}>
                        Your trusted partner for life-saving blood donations. Join us to make a difference.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#fff',
                                color: '#B71C1C',
                                fontWeight: 600,
                                px: 4,
                                '&:hover': { backgroundColor: '#f4f4f4' }
                            }}
                            onClick={() => handleNavigation('/find-camp')}
                        >
                            Find Donation Camp
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                fontWeight: 600,
                                px: 4,
                                '&:hover': { backgroundColor: '#fff', color: '#B71C1C', borderColor: '#fff' }
                            }}
                            onClick={() => handleNavigation('/book-appointment')}
                        >
                            Book Blood Appointment
                        </Button>
                    </Stack>
                </Box>
            </Box>

            {/* OPTIONAL SECTION */}
            <Container sx={{ py: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D32F2F', mb: 3, textAlign: 'center' }}>
                    Why Donate Blood?
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
                    Every donation can save up to 3 lives. Be a hero in someone's story by donating blood regularly.
                    We ensure safe, comfortable, and rewarding donation experiences at every visit.
                </Typography>
            </Container>

            {/* FOOTER */}
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
        </Box>
    );
};

export default ClientDashBord;
