import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions,
  CardHeader,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import SearchIcon from '@mui/icons-material/Search';

const DonorCenterList = () => {
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/donorCenters/get`)
      .then((res) => {
        setCenters(res.data);
        setFilteredCenters(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = centers.filter((center) =>
      center.centerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCenters(filtered);
  }, [searchQuery, centers]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this center?")) {
      try {
        await axios.delete(`http://localhost:5000/donorCenters/delete/${id}`);
        setCenters(centers.filter((center) => center._id !== id));
        setFilteredCenters(filteredCenters.filter((center) => center._id !== id));
      } catch (error) {
        console.error("Error deleting center:", error);
      }
    }
  };

  const handleUpdate = (center) => {
    navigate('/CreateDonorCenter', { state: { center } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box p={3} bgcolor="#f8f9fa" minHeight="100vh">
      <Typography variant="h4" align="center" fontWeight={700} mb={2} color="primary">
        Blood Donor Centers
      </Typography>

      <Box sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, city, or phone"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'error.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'error.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'error.main',
              },
            },
          }}
          aria-label="Search blood donor centers"
        />
      </Box>

      {filteredCenters.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" mt={4}>
          {searchQuery ? "No donor centers match your search." : "No donor centers found."}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredCenters.map((center) => (
            <Grid item xs={12} sm={6} md={4} key={center._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 10,
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'error.main' }}>
                      <BloodtypeIcon />
                    </Avatar>
                  }
                  title={center.centerName}
                  titleTypographyProps={{ fontWeight: 600, fontSize: '1.1rem' }}
                  sx={{
                    background: 'linear-gradient(to right, #f44336, #e53935)',
                    color: 'white',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    paddingY: 1.5,
                    paddingX: 2,
                  }}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2" display="flex" alignItems="center" gutterBottom>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                    <strong>Location:</strong> {center.city}
                  </Typography>
                  <Typography variant="body2" display="flex" alignItems="center" gutterBottom>
                    <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                    <strong>Contact:</strong> {center.phone}
                  </Typography>
                  <Typography variant="body2" display="flex" alignItems="center">
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <strong>Opening Hours:</strong> {center.openingStart} - {center.openingEnd}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                    onClick={() => handleUpdate(center)}
                  >
                    Update
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: 'error.main',
                      '&:hover': { bgcolor: 'error.dark' },
                    }}
                    onClick={() => handleDelete(center._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DonorCenterList;