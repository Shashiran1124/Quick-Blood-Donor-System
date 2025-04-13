import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SentImage from '../../images/sentImage.jpg'; // Reuse the same image

export default function SentBloodInventoryForm() {
  const [formData, setFormData] = useState({
    bloodType: '',
    sentUnits: '',
    sentDate: '',
    sentID: '',
    status: 'Available',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Populate form if editing
  useEffect(() => {
    if (item) {
      setFormData({
        bloodType: item.bloodType,
        sentUnits: item.sentUnits || '',
        sentDate: new Date(item.sentDate).toISOString().split('T')[0], // Use ISO format for consistency
        sentID: item.sentID || '',
        status: item.status,
      });
      setItemId(item._id);
      setIsEditMode(true);
    }
  }, [item]);

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'sentUnits') {
      // Allow only digits (whole numbers) - no decimals or special characters
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, sentUnits: value });
      }
    } else if (name === 'sentID') {
      // Allow only exactly 12 digits, no letters, special characters, or symbols
      if (/^\d{0,12}$/.test(value)) {
        setFormData({ ...formData, sentID: value });
      }
    } else {
      // For other fields (bloodType, sentDate, status), update normally
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Additional validation for sentID
    if (formData.sentID && formData.sentID.length !== 12) {
      setError('Recipient ID must be exactly 12 digits.');
      setIsSubmitting(false);
      return;
    }

    const url = isEditMode
      ? `http://localhost:5000/api/sent-blood/update/${itemId}`
      : 'http://localhost:5000/api/sent-blood/add';

    const requestBody = {
      bloodType: formData.bloodType,
      sentUnits: Number(formData.sentUnits),
      sentDate: formData.sentDate, // Send as raw YYYY-MM-DD string
      sentID: formData.sentID,
      status: formData.status,
    };

    try {
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert(isEditMode ? 'Inventory updated successfully' : 'Inventory added successfully');
        navigate('/dashsentBloodTable');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Full-Screen Transparent Background Image */}
      <img
        src={SentImage}
        alt="Blood Transparency Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100.7%',
          height: '115%',
          objectFit: 'cover',
          opacity: 1,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Header (Navbar) */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          width: '1380px',
          marginLeft: '-50px',
          marginTop: '-20px',
          backgroundColor: '#1a2a44',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          <span style={{ color: '#ff4d4f', marginRight: '0.5rem' }}>🩸</span>
          <span style={{ color: '#c3c3c3', fontSize: '13px' }}>Quick</span>
          <span style={{ color: '#8B0000', fontSize: '17px' }}>Blood</span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
          }}
        >
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/')}
          >
            Home
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/dashBloodInventoryForm')}
          >
            Inventory
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/dashsentBloodForm')}
          >
            Donations
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/Dashinvlevel')} // Fixed extra space
          >
            Level
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            
          >
            Report
          </a>
        </div>
      </nav>

      {/* Form Container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 70px)',
          marginLeft: '800px',
          padding: '20px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div
          style={{
            backgroundColor: '#fff6f6',
            backdropFilter: 'blur(60px)',
            WebkitBackdropFilter: 'blur(15px)',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100%',
            maxWidth: '400px',
            boxSizing: 'border-box',
            border: '2px solid #000000',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              color: '#000000',
              fontSize: '26px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            {isEditMode ? 'Edit Sent Blood Inventory' : 'Add Sent Blood Inventory'}
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  fontSize: '14px',
                }}
              >
                Blood Type
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
                style={{
                  padding: '8px',
                  width: '80px',
                  borderRadius: '5px',
                  border: '0.3px solid #000000',
                  fontSize: '14px',
                }}
              >
                <option value="" disabled>
                  Select Blood Type
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  fontSize: '14px',
                }}
              >
                Units Sent
              </label>
              <input
                type="text" // Changed to text for finer control
                name="sentUnits"
                value={formData.sentUnits}
                onChange={handleChange}
                placeholder="Enter Units Sent"
                required
                style={{
                  padding: '8px',
                  width: '90%',
                  borderRadius: '5px',
                  border: '0.3px solid #000000',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  fontSize: '14px',
                }}
              >
                Sent Date
              </label>
              <input
                type="date"
                name="sentDate"
                value={formData.sentDate}
                onChange={handleChange}
                min={today} // Restrict to today
                max={today} // Restrict to today
                required
                style={{
                  padding: '8px',
                  width: '90%',
                  borderRadius: '5px',
                  border: '0.3px solid #000000',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  fontSize: '14px',
                }}
              >
                Recipient ID (optional)
              </label>
              <input
                type="text"
                name="sentID"
                value={formData.sentID}
                onChange={handleChange}
                placeholder="Enter 12-digit ID"
                style={{
                  padding: '8px',
                  width: '90%',
                  borderRadius: '5px',
                  border: '0.3px solid #000000',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  fontSize: '14px',
                }}
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={{
                  padding: '8px',
                  width: '95%',
                  borderRadius: '5px',
                  border: '0.3px solid #000000',
                  fontSize: '14px',
                }}
              >
                <option value="Available">Available</option>
                <option value="Expired">Expired</option>
                <option value="Transferred">Transferred</option>
              </select>
            </div>

            {error && (
              <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#061c5b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  width: '30%',
                  marginBottom: '10px',
                }}
              >
                {isSubmitting ? 'Submitting...' : isEditMode ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashsentBloodTable')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginLeft: '50px',
                  cursor: 'pointer',
                  width: '40%',
                }}
              >
                View Records
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}