import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    if (location.state && location.state.appointment) {
      const appointment = location.state.appointment;
      console.log('Received appointment:', appointment);

      setFormData(appointment);

      if (appointment._id) {
        setAppointmentId(appointment._id);
        setIsEditMode(true);
        console.log('Appointment ID set:', appointment._id);
      } else {
        console.error('Appointment ID is missing');
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;
    let error = '';

    // Donor Name Validation: Only letters and spaces, no numbers
  if (name === 'donorName') {
    validValue = value.replace(/[^a-zA-Z\s]/g, '');
  }

    // Age Validation: Must be a number between 18 and 65
  if (name === 'age') {
    validValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
    const ageNumber = parseInt(validValue, 10);
  }

    // Email Validation: Standard email format
  if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  // Contact Number Validation: Only numbers, must be exactly 10 digits
  if (name === 'contactNumber') {
    validValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    
  }

    if (['onMedication', 'recentIllness', 'recentDonation', 'recentVaccination'].includes(name)) {
      if (value !== 'Yes' && value !== 'No') {
        error = 'Please select Yes or No';
      }
    }

    // Appointment Date Validation: Cannot be in the past
if (name === 'appointmentDate') {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
  
}

    setFormData({ ...formData, [name]: validValue });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting appointment:', formData);

    if (isEditMode && !appointmentId) {
      alert('Invalid appointment ID');
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:5000/DonAppointments/update/${appointmentId}`
        : 'http://localhost:5000/DonAppointments/add';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log('Backend response:', responseData);

      if (!response.ok) {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} appointment`);
        return;
      }

      navigate('/AppointmentConfirmation', {
        state: { formData, message: responseData.message, appointmentId }
      });

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the appointment.');
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    // Navigate to the desired page (e.g., back to appointments list)
    navigate('/AppointmentsList'); // Update with the correct path
  };

  return (
    <div>
      <Navbar></Navbar>
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
      backgroundColor: '#f9f9f9' 
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{isEditMode ? 'Edit' : 'New'} Donor Appointment</h2>
      <form onSubmit={handleSubmit}>
        {[ 
          { label: 'Donor Name', name: 'donorName', type: 'text', placeholder: 'Enter full name' },
          { label: 'Age', name: 'age', type: 'number', placeholder: '18-65 only' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'example@email.com' },
          { label: 'Contact Number', name: 'contactNumber', type: 'text', placeholder: '10-digit number' },
          { label: 'Donation Center', name: 'donationCenter', type: 'text', placeholder: 'Center location' }
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{field.label}:</label>
            <input 
              type={field.type} 
              name={field.name} 
              value={formData[field.name]} 
              onChange={handleChange} 
              required 
              placeholder={field.placeholder}
              style={{
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc'
              }}
            />
            {errors[field.name] && <p style={{ color: 'red', fontSize: '12px' }}>{errors[field.name]}</p>}
          </div>
        ))}

        {[ 
          { label: 'Gender', name: 'gender', options: ['Male', 'Female', 'Other'] },
          { label: 'Time Slot', name: 'timeSlot', options: ['Morning', 'Afternoon', 'Evening'] },
          { label: 'Donation Type', name: 'donationType', options: ['Whole Blood', 'Plasma', 'Platelets'] },
          { label: 'On Medication?', name: 'onMedication', options: ['Yes', 'No'] },
          { label: 'Recent Illness?', name: 'recentIllness', options: ['Yes', 'No'] },
          { label: 'Recent Donation?', name: 'recentDonation', options: ['Yes', 'No'] },
          { label: 'Recent Vaccination?', name: 'recentVaccination', options: ['Yes', 'No'] }
        ].map((select) => (
          <div key={select.name} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{select.label}:</label>
            <select 
              name={select.name} 
              value={formData[select.name]} 
              onChange={handleChange} 
              required
              style={{
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc'
              }}
            >
              <option value="">Select</option>
              {select.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Appointment Date:</label>
          <input 
  type="date" 
  name="appointmentDate" 
  value={formData.appointmentDate} 
  onChange={handleChange} 
  required 
  min={new Date().toISOString().split('T')[0]} // Set the minimum date to today
            style={{
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            width: '48%', 
            padding: '12px', 
            borderRadius: '5px', 
            backgroundColor: '#28a745', 
            color: '#fff', 
            fontSize: '16px', 
            cursor: 'pointer', 
            border: 'none',
            marginRight: '4%'
          }}
        >
          {isEditMode ? 'Update' : 'Submit'}
        </button>

        {/* Cancel Button */}
        <button 
          type="button" 
          onClick={handleCancel}
          style={{
            width: '48%', 
            padding: '12px', 
            borderRadius: '5px', 
            backgroundColor: '#dc3545', 
            color: '#fff', 
            fontSize: '16px', 
            cursor: 'pointer', 
            border: 'none'
          }}
        >
          Cancel
        </button>
      </form>
      
    </div>
    <Footer></Footer>
    </div>
  );
}
