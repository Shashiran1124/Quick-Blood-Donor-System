import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Footer from './Footer';
import Navbar from './Navbar';

export default function DonAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    donorName: '',
    age: '',
    gender: '',
    email: '',
    contactNumber: '',
    appointmentDate: '',
    timeSlot: '',
    donationType: '',
    donationCenter: '',
    onMedication: '',
    recentIllness: '',
    recentDonation: '',
    recentVaccination: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [errors, setErrors] = useState({});
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/donorCenters/get')
      .then((res) => setCenters(res.data))
      .catch((err) => console.error('Error fetching centers:', err));

    if (location.state && location.state.appointment) {
      const appointment = location.state.appointment;
      setFormData(appointment);
      if (appointment._id) {
        setAppointmentId(appointment._id);
        setIsEditMode(true);
      }
    }
  }, [location.state]);

  // Validation function for age
  const validateAge = (value) => {
    const currentAge = formData.age || ''; // Default to empty if no previous value
    let validValue = value.replace(/[^0-9]/g, '').slice(0, 2); // Limit to 2 digits
    if (validValue.length === 2) { // Validate only when 2 digits are entered
      const ageNum = parseInt(validValue, 10);
      if (ageNum < 18 || ageNum > 65) {
        return { validValue: currentAge, error: 'Age must be between 18 and 65' };
      }
    }
    return { validValue, error: '' };
  };

  // Updated validation function for contactNumber
  const validateContactNumber = (value) => {
    const currentNumber = formData.contactNumber || ''; // Default to empty if no previous value
    let validValue = value.replace(/[^0-9]/g, '').slice(0, 10); // Limit to 10 digits
    const validPrefixes = ['071', '072', '074', '076', '077', '078']; // Corrected list

    // Validate start with "0" as soon as the first digit is entered
    if (validValue.length >= 1) {
      if (validValue[0] !== '0') {
        return { validValue: currentNumber, error: 'Contact number must start with 0' };
      }
    }

    // Validate prefix and start with "0" when at least 3 digits
    if (validValue.length >= 3) {
      if (validValue[0] !== '0') {
        return { validValue: currentNumber, error: 'Contact number must start with 0' };
      }
      const prefix = validValue.slice(0, 3);
      if (validValue.length < 10 && !validPrefixes.includes(prefix)) {
        return { validValue: currentNumber, error: 'Contact number must start with 071, 072, 074, 076, 077, or 078' };
      }
    }

    // Validate exact 10 digits
    if (validValue.length === 10) {
      if (validValue[0] !== '0') {
        return { validValue: currentNumber, error: 'Contact number must start with 0' };
      }
      const prefix = validValue.slice(0, 3);
      if (!validPrefixes.includes(prefix)) {
        return { validValue: currentNumber, error: 'Contact number must start with 071, 072, 074, 076, 077, or 078' };
      }
    }

    return { validValue, error: validValue.length < 10 ? 'Contact number must be exactly 10 digits' : '' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;
    let error = '';

    if (name === 'donorName') {
      validValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    if (name === 'age') {
      const validation = validateAge(value);
      validValue = validation.validValue;
      error = validation.error;
    }

    if (name === 'contactNumber') {
      const validation = validateContactNumber(value);
      validValue = validation.validValue;
      error = validation.error;
    }

    if (['onMedication', 'recentIllness', 'recentDonation', 'recentVaccination'].includes(name)) {
      if (value !== 'Yes' && value !== 'No') {
        error = 'Please select Yes or No';
      }
    }

    if (name === 'appointmentDate') {
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
    }

    setFormData({ ...formData, [name]: validValue });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode && !appointmentId) {
      alert('Invalid appointment ID');
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:5000/DonAppointments/update/${appointmentId}`
        : 'http://localhost:5000/DonAppointments/add';
      const method = isEditMode ? 'PUT' : 'POST';
      const {...updatedData } = formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} appointment`);
        return;
      }

      navigate('/AppointmentConfirmation', {
        state: { formData, message: responseData.message, appointmentId }
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Not updated.');
    }
  };

  const handleCancel = () => {
    navigate('/AppointmentsList');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/patient-getting-chemotherapy-treatment_23-2149261089.jpg?t=st=1746815372~exp=1746818972~hmac=06593b34433806c0e54e653be280f81a0a5998db083ce9e54bbde289a6658dbd&w=1380")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '80vh',
      }}>
      <Navbar />
      
      <div style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 8px 32px 0 rgba(190, 73, 73, 0.37)',
        background: 'rgba(33, 14, 14, 0.75)',  // semi-transparent white
        backdropFilter: 'blur(10px)', // frosted glass effect
        WebkitBackdropFilter: 'blur(10px)',// for Safari
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px',
        }}>
          <h2 style={{ color: 'white' }}>
            {isEditMode ? 'Edit' : 'New'} Donor Appointment
          </h2>
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Donor Name', name: 'donorName', type: 'text', placeholder: 'Enter full name' },
            { label: 'Age', name: 'age', type: 'number', placeholder: '18-65 only' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'example@email.com' },
            { label: 'Contact Number', name: 'contactNumber', type: 'text', placeholder: '10-digit number' },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px',
                fontSize: '14px',
                color: 'white',
              }}>
                {field.label}:
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              {errors[field.name] && <p style={{ color: 'red', fontSize: '12px' }}>{errors[field.name]}</p>}
            </div>
          ))}
          <div style={{ marginBottom: '20px' }}>
            <FormControl
              fullWidth
              required
              sx={{
                '& label': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              <InputLabel id="donation-center-label">Donation Center</InputLabel>
              <Select
                labelId="donation-center-label"
                name="donationCenter"
                value={formData.donationCenter}
                onChange={handleChange}
                label="Donation Center"
                disabled={isEditMode}
                sx={{
                  fontSize: '16px',
                  padding: '12px',
                  color: 'white',
                }}
              >
                {centers.map((center) => (
                  <MenuItem key={center._id} value={center.centerName}>
                    {center.centerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.donationCenter && (
              <p style={{ color: 'red', fontSize: '12px' }}>{errors.donationCenter}</p>
            )}
          </div>

          {/* Select Fields */}
          {[
            { label: 'Gender', name: 'gender', options: ['Male', 'Female', 'Other'] },
            { label: 'Time Slot', name: 'timeSlot', options: ['Morning (8.00 A.M - 11.00 A.M)', 'Afternoon (12.00 P.M - 3.00 P.M)', 'Evening (4.00 P.M - 6.00 P.M )'] },
            { label: 'Donation Type', name: 'donationType', options: ['Whole Blood', 'Plasma', 'Platelets'] },
            { label: 'On Medication?', name: 'onMedication', options: ['Yes', 'No'] },
            { label: 'Recent Illness?', name: 'recentIllness', options: ['Yes', 'No'] },
            { label: 'Recent Donation?', name: 'recentDonation', options: ['Yes', 'No'] },
            { label: 'Recent Vaccination?', name: 'recentVaccination', options: ['Yes', 'No'] },
          ].map((select) => (
            <div key={select.name} style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px',
                fontSize: '14px',
                color: 'white',
              }}>
                {select.label}:
              </label>
              <select
                name={select.name}
                value={formData[select.name]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">Select</option>
                {select.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Appointment Date */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
              fontSize: '14px',
              color: 'white',
            }}>
              Appointment Date:
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]} // Set the minimum date to today
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="submit"
              style={{
                width: '48%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#28a745',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              {isEditMode ? 'Update' : 'Submit'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              style={{
                width: '48%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#dc3545',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}