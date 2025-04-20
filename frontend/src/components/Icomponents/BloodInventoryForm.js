import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import blodTransperencyImage from '../../images/bloodTrans.jpg'; // Import the transparent image

const BloodInventoryForm = () => {
  const [bloodType, setBloodType] = useState('');
  const [unitsAvailable, setUnitsAvailable] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [donorID, setDonorID] = useState('');
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  const handleUnitsChange = (e) => {
    const value = e.target.value;
    // Allow only digits (whole numbers) - no decimal points or special characters
    if (/^\d*$/.test(value)) { 
      setUnitsAvailable(value);
    }
  };

  // Get today's date
  const today = new Date().toISOString().split("T")[0];
  

  // Get tomorrow's date
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

    const handleDonorIDChange = (e) => {
      const value = e.target.value;
      // Allow only exactly 12 digits, no letters, special characters, or symbols
      if (/^\d{0,12}$/.test(value)) {
        setDonorID(value);
      }
    };

  useEffect(() => {
    if (item) {
      setBloodType(item.bloodType);
      setUnitsAvailable(item.unitsAvailable);
      setDonationDate(new Date(item.donationDate).toLocaleDateString('en-CA'));
      setExpirationDate(new Date(item.expirationDate).toLocaleDateString('en-CA'));
      setDonorID(item.donorID);
      setStatus(item.status);
      setIsEditing(true);
    }
  }, [item]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bloodInventoryData = {
      bloodType,
      unitsAvailable: Number(unitsAvailable),
      donationDate: new Date(donationDate),
      expirationDate: new Date(expirationDate),
      donorID,
      status,
    };

    try {
      const url = isEditing
        ? `http://localhost:5000/api/blood-inventory/update/${item._id}`
        : 'http://localhost:5000/api/blood-inventory/add';
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bloodInventoryData),
      });

      if (response.ok) {
        alert(isEditing ? 'Blood inventory updated successfully' : 'Blood inventory added successfully');
        navigate('/dashBloodInventoryTable');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewTable = () => {
    navigate('/dashBloodInventoryTable'); // Navigate to the inventory table
  };

  return (
    <div>
      {/* Full-Screen Transparent Background Image */}
      <img
        src={blodTransperencyImage}
        alt="Blood Transparency Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100.8%',
          height: '122%',
          objectFit: 'cover',
          opacity: 2.1,
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
          marginLeft: '-53px',
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
          <span style={{ color: '#c3c3c3', fontSize: '13.5px' }}>Quick</span>
          <span style={{ color: '#8B0000', fontSize: '17.2px' }}>Blood</span>
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
          marginLeft: '-500px',
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
            {isEditing ? 'Edit Donation' : 'Add Donation'}
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
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
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
                Units Available
              </label>
              <input
                type="number"
                value={unitsAvailable}
                onChange={handleUnitsChange}
                placeholder="Enter Units Available"
                min="0"
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
                Donation Date
              </label>
              <input
                type="date"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
                min={today}
                max={today}
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
                Expiration Date
              </label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                min={tomorrow}
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
                Donor ID
              </label>
              <input
  type="text"
  value={donorID}
  onChange={handleDonorIDChange}
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                style={{
                  padding: '8px',
                  width: '95%',
                  borderRadius: '5px',
                  border: '0.3px solid #000000',
                  fontSize: '14px',
                }}
              >
                <option value="" disabled>
                  Select Status
                </option>
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
                  marginBottom: '10px', // Space between buttons
                }}
              >
                {isSubmitting ? 'Submitting...' : isEditing ? 'Update' : 'Add'}
              </button>
              <button
                type="button" // Prevent form submission
                onClick={handleViewTable}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745', // Green color for "View Table"
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
                View Table
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BloodInventoryForm;