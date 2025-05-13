import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const CreateDonorCenter = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    centerName: '',
    centerCode: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    email: '',
    openingStart: '',
    openingEnd: '',
    daysOpen: '',
    donationTypes: '',
    maxCapacity: '',
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [centerId, setCenterId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Prevent non-letter input for specific fields
  const handleKeyPress = (e) => {
    const char = String.fromCharCode(e.which || e.keyCode);
    if (!/^[A-Za-z\s]$/.test(char)) {
      e.preventDefault();
    }
  };

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'centerName':
        return value.trim().length < 3 ? '' : '';
      case 'centerCode':
        return !/^[A-Z0-9]{3,10}$/.test(value) ? '' : '';
      case 'address':
        return value.trim().length < 5 ? '' : '';
      case 'city':
        return !/^[A-Za-z\s]{2,}$/.test(value) ? '' : '';
      case 'province':
        return !/^[A-Za-z\s]{2,}$/.test(value) ? '' : '';
      case 'postalCode':
        return !/^\d{0,5}$/.test(value) ? '' : '';
      case 'phone':
        return !/^\d{0,10}$/.test(value) ? 'Phone must be 10 digits' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'openingStart':
        return !value ? 'Opening start time is required' : '';
      case 'openingEnd':
        if (!value) return 'Opening end time is required';
        if (formData.openingStart && value <= formData.openingStart) {
          return 'End time must be after start time';
        }
        return '';
      case 'daysOpen':
        const days = value.split(',').map(day => day.trim()).filter(day => day);
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.every(day => validDays.includes(day)) && days.length > 0
          ? ''
          : 'Select at least one valid day';
      case 'donationTypes':
        const types = value.split(',').map(type => type.trim()).filter(type => type);
        const validTypes = ['Whole Blood', 'Plasma', 'Platelets'];
        return types.every(type => validTypes.includes(type)) && types.length > 0
          ? ''
          : 'Select at least one valid donation type';
      case 'maxCapacity':
        return !/^\d+$/.test(value) || parseInt(value) < 1 ? 'Max capacity must be a positive number' : '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const center = location.state?.center;
    if (center) {
      setFormData({
        centerName: center.centerName || '',
        centerCode: center.centerCode || '',
        address: center.address || '',
        city: center.city || '',
        province: center.province || '',
        postalCode: center.postalCode || '',
        phone: center.phone || '',
        email: center.email || '',
        openingStart: center.openingStart || '',
        openingEnd: center.openingEnd || '',
        daysOpen: (center.daysOpen || []).join(', '),
        donationTypes: (center.donationTypes || []).join(', '),
        maxCapacity: center.maxCapacity || '',
      });
      if (center._id) {
        setCenterId(center._id);
        setIsEditMode(true);
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle multi-select dropdown for daysOpen and donationTypes
    if (['daysOpen', 'donationTypes'].includes(name)) {
      const selectedOptions = Array.isArray(value) ? value : value.split(',').map(item => item.trim()).filter(item => item);
      setFormData({
        ...formData,
        [name]: selectedOptions.join(', '),
      });
      // Real-time validation
      const error = validateField(name, selectedOptions.join(', '));
      setErrors({
        ...errors,
        [name]: error,
      });
      return;
    }
    // Filter input for centerName, city, and province
    if (['centerName', 'city', 'province'].includes(name)) {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return; // Ignore input if it contains non-letters
      }
    }
    // Allow only integers for specific fields
    if (['postalCode'].includes(name)) {
      if (!/^\d{0,5}$/.test(value)) {
        return; // Ignore input if it contains non-digits
      }
    }
    if (['phone'].includes(name)) {
      if (!/^\d{0,10}$/.test(value)) {
        return; // Ignore input if it contains non-digits
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    // Real-time validation
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the form errors before submitting');
      return;
    }

    if (isEditMode && !centerId) {
      setError('Invalid center ID');
      return;
    }

    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const url = isEditMode
        ? `http://localhost:5000/donorCenters/update/${centerId}`
        : 'http://localhost:5000/donorCenters/add';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          centerName: formData.centerName,
          centerCode: formData.centerCode,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          phone: formData.phone,
          email: formData.email,
          openingStart: formData.openingStart,
          openingEnd: formData.openingEnd,
          daysOpen: formData.daysOpen.split(',').map((day) => day.trim()),
          donationTypes: formData.donationTypes.split(',').map((type) => type.trim()),
          maxCapacity: parseInt(formData.maxCapacity),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
        setErrors({});

        if (!isEditMode) {
          setFormData({
            centerName: '',
            centerCode: '',
            address: '',
            city: '',
            province: '',
            postalCode: '',
            phone: '',
            email: '',
            openingStart: '',
            openingEnd: '',
            daysOpen: '',
            donationTypes: '',
            maxCapacity: '',
          });
        }
      } else {
        setError(data.error || 'Failed to create or update donor center');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const validDonationTypes = ['Whole Blood', 'Plasma', 'Platelets'];

  return (
    
      <div
      style={{backgroundImage: 'url("https://img.freepik.com/free-photo/human-blood-globulins_1268-28780.jpg?t=st=1746815536~exp=1746819136~hmac=1c8d00c7315bde8fad20eb9f959183b99638791bf11c1dd1bc56b85431132d41&w=1380")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    
    minHeight: '80vh',}}>
      <Navbar />
    <Box sx={{ maxWidth: '700px', mx: 'auto', my: 4, p: 3, bgcolor: '#f9f9f9', borderRadius: 8, 
              boxShadow: '0 8px 32px 0 rgba(190, 73, 73, 0.37)', background: 'rgba(241, 241, 241, 0.75)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              }}>
      
      <Typography variant="h5" align="center" gutterBottom>
        {state?.center ? 'Update Donor Center' : 'Create Donor Center'}
      </Typography>

      {message && (
        <Typography color="success.main" align="center" gutterBottom>
          {message}
        </Typography>
      )}
      {error && (
        <Typography color="error.main" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Center Name"
              id="centerName"
              name="centerName"
              value={formData.centerName}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              error={!!errors.centerName}
              helperText={errors.centerName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Center Code"
              id="centerCode"
              name="centerCode"
              value={formData.centerCode}
              onChange={handleChange}
              error={!!errors.centerCode}
              helperText={errors.centerCode}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Province"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              error={!!errors.province}
              helperText={errors.province}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Opening Start"
              id="openingStart"
              name="openingStart"
              type="time"
              value={formData.openingStart}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.openingStart}
              helperText={errors.openingStart}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Opening End"
              id="openingEnd"
              name="openingEnd"
              type="time"
              value={formData.openingEnd}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.openingEnd}
              helperText={errors.openingEnd}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.daysOpen}>
              <InputLabel id="daysOpen-label">Days Open</InputLabel>
              <Select
                labelId="daysOpen-label"
                id="daysOpen"
                name="daysOpen"
                multiple
                value={formData.daysOpen.split(',').map(day => day.trim()).filter(day => day)}
                onChange={handleChange}
                input={<OutlinedInput label="Days Open" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                required
              >
                {validDays.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
              {errors.daysOpen && <Typography color="error" variant="caption">{errors.daysOpen}</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.donationTypes}>
              <InputLabel id="donationTypes-label">Donation Types</InputLabel>
              <Select
                labelId="donationTypes-label"
                id="donationTypes"
                name="donationTypes"
                multiple
                value={formData.donationTypes.split(',').map(type => type.trim()).filter(type => type)}
                onChange={handleChange}
                input={<OutlinedInput label="Donation Types" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                required
              >
                {validDonationTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.donationTypes && <Typography color="error" variant="caption">{errors.donationTypes}</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Max Capacity"
              id="maxCapacity"
              name="maxCapacity"
              type="number"
              value={formData.maxCapacity}
              onChange={handleChange}
              required
              inputProps={{ min: 1 }}
              error={!!errors.maxCapacity}
              helperText={errors.maxCapacity}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5 }}
              onClick={() => navigate('/DonorCenterList')}
            >
              {isEditMode ? 'Update Donor Center' : 'Create Donor Center'}
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Box>
    <Footer />
    </div>
    
    
  );
};

export default CreateDonorCenter;