import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  Divider,
  Grid2,
} from "@mui/material";
import axios from "axios";

const initialForm = {
  centerName: "",
  centerCode: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
  email: "",
  openingStart: "",
  openingEnd: "",
  daysOpen: [],
  donationTypes: [],
  maxCapacity: "",
  isActive: true,
};



const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const donationOptions = ["Whole Blood", "Platelets", "Plasma"];

const CreateDonorCenter = () => {
  const navigate = useNavigate();
  const [formId, setFormId] = useState(null); // Used to track if we are updating
  const location = useLocation();
  const { center } = location.state || {}; // Accessing the passed center data
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
  
    if (!formData.centerName.trim()) newErrors.centerName = "Center name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
  
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be exactly 10 digits.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address.";
  
    // ⏰ Validate time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  
    if (!formData.openingStart) {
      newErrors.openingStart = "Opening time is required.";
    } else if (!timeRegex.test(formData.openingStart)) {
      newErrors.openingStart = "Invalid time format (HH:MM).";
    }
  
    if (!formData.openingEnd) {
      newErrors.openingEnd = "Closing time is required.";
    } else if (!timeRegex.test(formData.openingEnd)) {
      newErrors.openingEnd = "Invalid time format (HH:MM).";
    }
  
    if (formData.openingStart && formData.openingEnd) {
      const [startH, startM] = formData.openingStart.split(":").map(Number);
      const [endH, endM] = formData.openingEnd.split(":").map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;
  
      if (startMinutes === endMinutes) {
        newErrors.openingEnd = "Opening and closing times cannot be the same.";
      } else if (startMinutes > endMinutes) {
        newErrors.openingEnd = "Closing time must be after opening time.";
      }
    }
  
    if (!formData.daysOpen.length) newErrors.daysOpen = "Select at least one open day.";
    if (!formData.donationTypes.length) newErrors.donationTypes = "Select at least one donation type.";
    if (!formData.maxCapacity || isNaN(formData.maxCapacity) || Number(formData.maxCapacity) <= 0) {
      newErrors.maxCapacity = "Max capacity must be a positive number.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  useEffect(() => {
    if (center) {
      // If the center data is passed, populate the form fields
      setFormData({
        centerName: center.centerName,
        centerCode: center.centerCode || '',
        address: center.address,
        city: center.city,
        province: center.province || '',
        postalCode: center.postalCode || '',
        phone: center.phone,
        email: center.email,
        openingStart: center.openingStart,
        openingEnd: center.openingEnd,
        daysOpen: center.daysOpen || [],
        donationTypes: center.donationTypes || [],
        maxCapacity: center.maxCapacity,
        isActive: center.isActive,
      });
    }
  }, [center]); // Run the effect when `center` data changes

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let updatedValue = value;
  
    // Allow only digits for postalCode and phone
    if (name === "postalCode" || name === "phone") {
      updatedValue = value.replace(/\D/g, ""); // Remove non-digit characters
    }
  
    // Allow only letters for centerName, city, and province
    if (name === "centerName" || name === "city" || name === "province") {
      updatedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-letter characters
    }
  
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };
  

  const handleCheckboxChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      if (formId) {
        await axios.put(`http://localhost:5000/donorCenters/update/${formId}`, formData);
        alert(center ? "Center updated successfully" : "Center added successfully");
        navigate('/DonorCenterList');
      }
      if (formId) {
        const response = await axios.post("http://localhost:5000/donorCenters/add", formData);
        alert(center ? "Center updated successfully" : "Center added successfully");
        navigate('/DonorCenterList');
        if (response.data._id) {
          setFormId(response.data._id); //  save returned ID
        }
      }
      setFormData(initialForm);
      setFormId(null); // Reset after submission
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit donor center.");
    }
  };
  

  return (
    <Paper elevation={4} sx={{ p: 5, maxWidth: 960, mx: "auto", mt: 6, borderRadius: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Donor Center
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        Please fill in the details below to register a new center
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Divider sx={{ my: 4 }} />

        {/* Center Details */}
        <Typography variant="h6" gutterBottom>
          Center Details
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Center Name"
              name="centerName"
              value={formData.centerName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.centerName}
              helperText={errors.centerName}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Center Code"
              name="centerCode"
              value={formData.centerCode}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>

          <Grid2 xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              multiline
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid2>

          <Grid2 xs={12} sm={4}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <TextField
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <TextField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 4 }} />

        {/* Contact */}
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 4 }} />

        {/* Operations */}
        <Typography variant="h6" gutterBottom>
          Operational Details
        </Typography>
        <Grid2 container spacing={3}>
        <Grid2 xs={12} sm={6}>
  <TextField
    label="Opening Time"
    name="openingStart"
    type="time"
    value={formData.openingStart}
    onChange={handleChange}
    fullWidth
    required
    error={!!errors.openingStart}
    helperText={errors.openingStart}
    InputLabelProps={{ shrink: true }}
    inputProps={{ step: 300 }} // 5 min steps
  />
</Grid2>

<Grid2 xs={12} sm={6}>
  <TextField
    label="Closing Time"
    name="openingEnd"
    type="time"
    value={formData.openingEnd}
    onChange={handleChange}
    fullWidth
    required
    error={!!errors.openingEnd}
    helperText={errors.openingEnd}
    InputLabelProps={{ shrink: true }}
    inputProps={{ step: 300 }} // 5 min steps
  />
</Grid2>

          <Grid2 xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Days Open
            </Typography>
            <FormGroup row>
              {daysList.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={formData.daysOpen.includes(day)}
                      onChange={() => handleCheckboxChange(day, "daysOpen")}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
            {errors.daysOpen && (
              <Typography color="error" variant="caption">
                {errors.daysOpen}
              </Typography>
            )}
          </Grid2>

          <Grid2 xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Accepted Donation Types
            </Typography>
            <FormGroup row>
              {donationOptions.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={formData.donationTypes.includes(type)}
                      onChange={() => handleCheckboxChange(type, "donationTypes")}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
            {errors.donationTypes && (
              <Typography color="error" variant="caption">
                {errors.donationTypes}
              </Typography>
            )}
          </Grid2>

          <Grid2 xs={12} sm={6} sx={{mt: 2}}>
            <TextField
              label="Max Daily Capacity"
              name="maxCapacity"
              type="number"
              value={formData.maxCapacity}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.maxCapacity}
              helperText={errors.maxCapacity}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  color="primary"
                />
              }
              label="Center is Active"
              sx={{ mt: 3 }}
            />
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 4 }} />

        <Button type="submit" variant="contained" color="primary">
          {center ? "Update" : "Create"}
        </Button>

      </form>
    </Paper>
  );
};

export default CreateDonorCenter;
