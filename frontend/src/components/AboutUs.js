import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ✅ IMPORT IMAGES
import aboutBg from '../images/aboutus.bt.jpg';
import leader1 from '../images/navodyaSiri.jpeg';
import leader2 from '../images/malindu.jpeg';
import leader3 from '../images/shashiran.jpeg';
import leader4 from '../images/kavindi.jpeg';

const AboutUsPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* HEADER */}
            <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff',padding: '0.5rem 1rem' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        QuickBlood
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button sx={{ color: '#fff', fontWeight: 600 }} onClick={() => handleNavigation('/')}>
                            Home
                        </Button>
                       
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* HERO SECTION */}
            <Box
                sx={{
                    backgroundImage: `linear-gradient(to right, rgba(183,28,28,0.8), rgba(183,28,28,0.8)), url(${aboutBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    py: 8,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Our Story
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', }}>
                    We are committed to providing a lifetime of care. With passion, leadership and innovation, we aim to save lives every day.
                </Typography>
            </Box>

            {/* CONTENT */}
            <Container sx={{ py: 5 }}>
                <Grid container spacing={4}>
                    {/* LEFT SIDE */}
                    <Grid item xs={12} md={6}>
                        {/* Vision */}
                        <Box
                            sx={{
                                border: '2px solid #D32F2F',
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D32F2F', mb: 1 }}>
                                Our Vision
                            </Typography>
                            <Typography variant="body1">
                                To be recognized as the Center of Excellence in Blood Donation, Emergency Care, and Community Health.
                            </Typography>
                        </Box>

                        {/* Mission */}
                        <Box
                            sx={{
                                border: '2px solid #D32F2F',
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D32F2F', mb: 1 }}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1">
                                To provide the highest quality, safe, and accessible blood donation services, supporting hospitals and communities with compassion and professionalism.
                            </Typography>
                        </Box>

                        {/* Values */}
                        <Box
                            sx={{
                                border: '2px solid #D32F2F',
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D32F2F', mb: 1 }}>
                                Our Values
                            </Typography>
                            <Typography variant="body1">
                                We stand for integrity, respect, empathy, teamwork, and excellence in every drop we collect and every life we touch.
                            </Typography>
                        </Box>

                        {/* History - no frame */}
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D32F2F', mb: 1 }}>
                            Our History
                        </Typography>
                        <Typography variant="body1">
                            Founded in 2020, QuickBlood began as a small initiative to improve access to life-saving blood donations in underserved communities.
                            Over the years, we have grown into a trusted organization, partnering with hospitals and health providers across the region.
                            Our journey has been fueled by innovation, dedication, and a commitment to saving lives every single day.
                        </Typography>
                    </Grid>

                    {/* RIGHT SIDE - LEADERS */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            {[
                                { name: 'Dr. Navodya Siriwardana', role: 'Chief Executive Officer', img: leader1 },
                                { name: 'Dr. Malindu Pemaduwa', role: 'Medical Director', img: leader2 },
                                { name: 'Dr. Shashiran Thalanagama', role: 'Chief Operations Officer', img: leader3 },
                                { name: 'Dr. Kavindi Siriwardana', role: 'Director Women Affairs and lady care', img: leader4 }
                            ].map((leader, idx) => (
                                <Grid item xs={12} sm={6} key={idx}>
                                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                                        <img src={leader.img} alt={leader.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{leader.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{leader.role}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
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

export default AboutUsPage;
