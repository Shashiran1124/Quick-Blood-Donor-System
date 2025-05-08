import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CreateDonorCenter = () => {
  const { state } = useLocation();
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

  const [isEditMode, setIsEditMode] = useState(false);
  const [centerId, setCenterId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting appointment:', formData);

    if (isEditMode && !centerId) {
      alert('Invalid appointment ID');
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

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '25px', background: '#f9f9f9', borderRadius: '10px', fontFamily: 'Arial, sans-serif', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        {state?.center ? 'Update Donor Center' : 'Create Donor Center'}
      </h2>

      {message && <div style={{ marginBottom: '20px', color: 'green', fontWeight: 'bold' }}>{message}</div>}
      {error && <div style={{ marginBottom: '20px', color: 'red', fontWeight: 'bold' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="centerName" style={{ display: 'block', fontWeight: 'bold' }}>Center Name</label>
          <input type="text" id="centerName" name="centerName" value={formData.centerName} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="centerCode" style={{ display: 'block', fontWeight: 'bold' }}>Center Code</label>
          <input type="text" id="centerCode" name="centerCode" value={formData.centerCode} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="address" style={{ display: 'block', fontWeight: 'bold' }}>Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="city" style={{ display: 'block', fontWeight: 'bold' }}>City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="province" style={{ display: 'block', fontWeight: 'bold' }}>Province</label>
          <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="postalCode" style={{ display: 'block', fontWeight: 'bold' }}>Postal Code</label>
          <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="phone" style={{ display: 'block', fontWeight: 'bold' }}>Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required pattern="^\d{10}$" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold' }}>Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="openingStart" style={{ display: 'block', fontWeight: 'bold' }}>Opening Start (HH:MM)</label>
          <input type="time" id="openingStart" name="openingStart" value={formData.openingStart} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="openingEnd" style={{ display: 'block', fontWeight: 'bold' }}>Opening End (HH:MM)</label>
          <input type="time" id="openingEnd" name="openingEnd" value={formData.openingEnd} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="daysOpen" style={{ display: 'block', fontWeight: 'bold' }}>Days Open (comma separated)</label>
          <input type="text" id="daysOpen" name="daysOpen" value={formData.daysOpen} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="donationTypes" style={{ display: 'block', fontWeight: 'bold' }}>Donation Types (comma separated)</label>
          <input type="text" id="donationTypes" name="donationTypes" value={formData.donationTypes} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="maxCapacity" style={{ display: 'block', fontWeight: 'bold' }}>Max Capacity</label>
          <input type="number" id="maxCapacity" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange} required min="1" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
          {isEditMode ? 'Update Donor Center' : 'Create Donor Center'}
        </button>
      </form>
    </div>
  );
};

export default CreateDonorCenter;
