import React, { useState } from 'react';
import { TextField, Button, Container, Grid, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegistrationNav from './RegistrationNav';
import RegistrationFoot from './RegistrationFoot';

const Users = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      district: '',
      province: '',
      postalcode: ''
    },
    location: {
      latitude: '',
      longitude: ''
    },
    bloodType: '',
    createDate: new Date().toISOString()
  });

  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const lettersOnlyRegex = /^[A-Za-z ]*$/;

    if (name === 'name' || name === 'address.city' || name === 'address.district' || name === 'address.province') {
      if (!lettersOnlyRegex.test(value)) return; // Prevent invalid input
    }

    if (name.startsWith('address')) {
      const addressField = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value }
      }));
    } else if (name.startsWith('location')) {
      const locationField = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        location: { ...prevData.location, [locationField]: value }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/donors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Donor added successfully!');
      navigate('/AllUsers');
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <RegistrationNav />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Donor Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="NIC"
            name="userId"
            type="number"
            fullWidth
            value={formData.userId}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Street"
                name="address.street"
                fullWidth
                value={formData.address.street}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="address.city"
                fullWidth
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="District"
                name="address.district"
                fullWidth
                value={formData.address.district}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Province"
                name="address.province"
                fullWidth
                value={formData.address.province}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Postal Code"
                name="address.postalcode"
                fullWidth
                value={formData.address.postalcode}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Location
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Latitude"
                name="location.latitude"
                type="number"
                fullWidth
                value={formData.location.latitude}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Longitude"
                name="location.longitude"
                type="number"
                fullWidth
                value={formData.location.longitude}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <FormControl fullWidth required margin="normal">
            <InputLabel>Blood Type</InputLabel>
            <Select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              label="Blood Type"
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Created Date"
            name="createDate"
            fullWidth
            value={formData.createDate}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <Box textAlign="center">
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Add Donor
            </Button>
          </Box>
        </form>
      </Container>
      <RegistrationFoot />
    </div>
  );
};

export default Users;
