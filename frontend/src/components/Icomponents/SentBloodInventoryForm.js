import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SentBloodInventoryForm = () => {
  const [bloodType, setBloodType] = useState('');
  const [unitsSent, setUnitsSent] = useState(0);
  const [sentDate, setSentDate] = useState('');
  const [recipientID, setRecipientID] = useState('');
  const [status, setStatus] = useState('Sent');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  useEffect(() => {
    if (item) {
      setBloodType(item.bloodType);
      setUnitsSent(item.unitsSent);
      setSentDate(new Date(item.sentDate).toISOString().split('T')[0]);
      setRecipientID(item.recipientID);
      setStatus(item.status);
      setIsEditing(true);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sentBloodInventoryData = {
      bloodType,
      unitsSent: Number(unitsSent),
      sentDate: new Date(sentDate),
      recipientID,
      status,
    };

    try {
      const url = isEditing
        ? item?._id ? `http://localhost:5000/api/sent-blood/update/${item._id}` : null
        : 'http://localhost:5000/api/sent-blood/add';

      if (!url) {
        setError('Unable to update item, ID missing.');
        return;
      }

      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sentBloodInventoryData),
      });

      if (response.ok) {
        alert(isEditing ? 'Sent blood inventory updated successfully' : 'Sent blood inventory added successfully');
        navigate('dashsentBloodTable');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred while submitting the form.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#E5E5E5', // Light gray background like in the images
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF', // White background for the form
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #D3D3D3', // Light gray border
          width: '100%',
          maxWidth: '400px', // Slightly wider than before to match the image
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          {isEditing ? 'Edit Sent Blood Inventory' : 'Add Sent Blood Inventory'}
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
                width: '80px', // Small width for blood type dropdown
                borderRadius: '5px',
                border: '1px solid #D3D3D3',
                fontSize: '14px',
              }}
            >
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
              type="number"
              value={unitsSent}
              onChange={(e) => setUnitsSent(e.target.value)}
              required
              min="0"
              style={{
                padding: '8px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid #D3D3D3',
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
              value={sentDate}
              onChange={(e) => setSentDate(e.target.value)}
              required
              style={{
                padding: '8px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid #D3D3D3',
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
              Recipient ID (Optional)
            </label>
            <input
              type="text"
              value={recipientID}
              onChange={(e) => setRecipientID(e.target.value)}
              style={{
                padding: '8px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid #D3D3D3',
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
                width: '100%',
                borderRadius: '5px',
                border: '1px solid #D3D3D3',
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
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
            >
              {isSubmitting ? 'Submitting...' : isEditing ? 'Update' : 'Add'} Sent Blood Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SentBloodInventoryForm;