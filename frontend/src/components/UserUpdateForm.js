import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Grid, MenuItem, Select, InputLabel, FormControl, Box, Typography, dividerClasses } from '@mui/material';
import axios from "axios";
import RegistrationNav from './RegistrationNav';
import RegistrationFoot from './RegistrationFoot';

const UserUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const donorData = location.state?.donorData; 

  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      district: '',
      province: '',
      postalcode: '',
    },
    location: {
      latitude: '',
      longitude: '',
    },
    bloodType: '',
    createDate: '',
  });

  
  useEffect(() => {
    getDonorById();
  }, [id, donorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, field] = name.split('.');

    if (parent === 'address' || parent === 'location') {
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getDonorById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/donors/${id}`);
      setFormData(response.data);
    } catch (error) {
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/donors/update/${id}`,
        formData, 
      );
      console.log(response.data);
      if(response.data.isSuccess){
        alert(response.data.message);
        navigate('/AllUsers');
      }else{
        alert(response.message || 'Failed to update user');
      }
      
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <RegistrationNav></RegistrationNav>
      <Container maxWidth="sm">
      
      <Typography variant="h4" align="center" gutterBottom>Update Donor</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="User ID" name="userId" type="number" fullWidth value={formData.userId} onChange={handleChange} required margin="normal" />
        <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} required margin="normal" />
        <TextField label="Email" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} required margin="normal" />

        <Typography variant="h6">Address</Typography>
        <Grid container spacing={2}>
          {['street', 'city', 'district', 'province', 'postalcode'].map((field) => (
            <Grid item xs={6} key={field}>
              <TextField label={field.charAt(0).toUpperCase() + field.slice(1)} name={`address.${field}`} fullWidth value={formData.address[field]} onChange={handleChange} required />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6">Location</Typography>
        <Grid container spacing={2}>
          {['latitude', 'longitude'].map((field) => (
            <Grid item xs={6} key={field}>
              <TextField label={field.charAt(0).toUpperCase() + field.slice(1)} name={`location.${field}`} type="number" fullWidth value={formData.location[field]} onChange={handleChange} required />
            </Grid>
          ))}
        </Grid>

        <FormControl fullWidth required margin="normal">
          <InputLabel>Blood Type</InputLabel>
          <Select name="bloodType" value={formData.bloodType} onChange={handleChange}>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Created Date" fullWidth value={formData.createDate} margin="normal" InputProps={{ readOnly: true }} />

        <Box textAlign="center">
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Update Donor</Button>
        </Box>
      </form>
    </Container>
    <RegistrationFoot></RegistrationFoot>
    </div>
    

  );
  
};

export default UserUpdateForm;
