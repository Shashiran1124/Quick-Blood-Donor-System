import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const dashboardItems = [
        {
            title: 'Manage Donors',
            description: 'View and manage all registered blood donors.',
            icon: <PeopleIcon sx={{ fontSize: 40, color: '#D32F2F' }} />,
            path: '/manage-donors'
        },
        {
            title: 'Manage Appointments',
            description: 'Handle donor appointment scheduling and records.',
            icon: <EventIcon sx={{ fontSize: 40, color: '#D32F2F' }} />,
            path: '/manage-appointments'
        },
        {
            title: 'Camp Blood Inventory',
            description: 'Monitor and manage blood stock collected in camps.',
            icon: <InventoryIcon sx={{ fontSize: 40, color: '#D32F2F' }} />,
            path: '/manage-inventory'
        },
        {
            title: 'Hospital Blood Inventory',
            description: 'View and manage blood stock in hospital storage.',
            icon: <LocalHospitalIcon sx={{ fontSize: 40, color: '#D32F2F' }} />,
            path: '/'
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* HEADER */}
            <AppBar position="static" sx={{ backgroundColor: '#B71C1C', color: '#fff' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
                        QuickBlood Admin Panel
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#9a1212' }
                            }}
                            onClick={() => handleNavigation('/admin-dashbord')}
                        >
                            Home
                        </Button>
                        <Button
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#9a1212' }
                            }}
                            onClick={() => handleNavigation('/AboutUs')}
                        >
                            About
                        </Button>
                        
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* MAIN CONTENT */}
            <Box sx={{ flexGrow: 1, py: 5, backgroundColor: '#f9f9f9' }}>
                <Container>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
                        Welcome, Admin
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {dashboardItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    {item.icon}
                                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'center', my: 1, color: '#666' }}>
                                        {item.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 'auto', backgroundColor: '#D32F2F', '&:hover': { backgroundColor: '#b71c1c' } }}
                                        onClick={() => navigate(item.path)}
                                    >
                                        Manage
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
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

export default AdminDashboard;
