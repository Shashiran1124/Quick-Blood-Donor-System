import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BloodTableImage from '../../images/bloodTable.jpg'; // Import the transparent image

export default function SentBloodTable() {
  const [sentBlood, setSentBlood] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch sent blood records from the server
  const fetchSentBlood = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sent-blood/');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setSentBlood(result.data || []);
    } catch (error) {
      console.error("Error fetching sent blood records:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSentBlood();
  }, [fetchSentBlood]);

  // Navigate to update form with selected sent blood data
  const handleUpdate = (item) => {
    navigate('/dashSentBloodForm', { state: { item } });
  };

  // Delete a sent blood record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/sent-blood/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Sent blood record deleted successfully');
        fetchSentBlood();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.message || errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('An error occurred while deleting the record.');
    }
  };

  // Filter records based on search query
  const filteredSentBlood = sentBlood.filter(item =>
    item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Transparent Background Image */}
      <img
        src={BloodTableImage}
        alt="Blood Transparency Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120%',
          height: '110%',
          objectFit: 'cover',
          opacity: 0.15,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Navigation Bar */}
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
            onClick={() => navigate('/dashBloodInventoryTable')}
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
            onClick={() => navigate('/dashBloodInventoryForm')}
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
            Reports
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
            Contact
          </a>
        </div>
      </nav>

      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>
        Sent Blood Records
      </h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by Blood Type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px'
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <table style={{ width: '75%', borderCollapse: 'collapse', border: '1px solid #000000', marginLeft: '160px' }}>
          <thead>
            <tr style={{ backgroundColor: '#100d36', color: '#fff' }}>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Blood Type</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Sent Units</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Sent Date</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Sent ID</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Status</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSentBlood.length > 0 ? (
              filteredSentBlood.map((item) => (
                <tr key={item._id} style={{ backgroundColor: '#BFBFBF' }}>
                  <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.bloodType}</td>
                  <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.sentUnits}</td>
                  <td style={{ border: '2.2px solid #000000', padding: '12px' }}>
                    {new Date(item.sentDate).toLocaleDateString('en-US')}
                  </td>
                  <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.sentID}</td>
                  <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.status}</td>
                  <td style={{ border: '2.2px solid #000000', padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleUpdate(item)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#0711fe',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '8px'
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#fc0707',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '12px', backgroundColor: '#BFBFBF' }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}