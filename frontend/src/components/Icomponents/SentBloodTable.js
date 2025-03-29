import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SentBloodTable() {
  const [sentBlood, setSentBlood] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch sent blood records from the server
  const fetchSentBlood = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sent-blood/');
      const result = await response.json();
      console.log("Fetched Sent Blood Result:", result); // Log the response

      if (response.ok) {
        if (result.data) {
          console.log("Sent Blood Data:", result.data); // Log the data if it exists
          setSentBlood(result.data); // Set the state with the data
        } else {
          console.error("No data found in the response");
        }
      } else {
        console.error("Failed to fetch sent blood records:", result.message);
      }
    } catch (error) {
      console.error("Error fetching sent blood records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentBlood(); // Fetch the sent blood records on component mount
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Navigate to update form with selected sent blood data
  const handleUpdate = (item) => {
    navigate('/dashSentBloodForm', { state: { item } });
  };

  // Delete a sent blood record
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sent-blood/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchSentBlood(); // Refresh the sent blood list
        alert('Sent blood record deleted successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.message || errorData.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the record. Please check the console for more details.');
    }
  };

  // Filter sent blood records based on search query
  const filteredSentBlood = sentBlood.filter(item =>
    item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Sent Blood Records</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            width: '300px',
            marginRight: '20px'
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
          <thead>
            <tr style={{ backgroundColor: '#7D2CE0', color: '#fff' }}>
              <th style={{ border: '1px solid #000000', padding: '12px' }}>Blood Type</th>
              <th style={{ border: '1px solid #000000', padding: '12px' }}>Sent Units</th>
              <th style={{ border: '1px solid #000000', padding: '12px' }}>Sent Date</th>
              <th style={{ border: '1px solid #000000', padding: '12px' }}>Sent ID</th>
              <th style={{ border: '1px solid #000000', padding: '12px' }}>Status</th>
              <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSentBlood.map((item) => (
              <tr key={item._id} style={{ backgroundColor: '#fff' }}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{item.bloodType}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{item.sentUnits}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(item.sentDate).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{item.sentID}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{item.status}</td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(item)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#007bff',
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
                    onClick={() => handleDelete(item._id)} // Pass the id instead of bloodType
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
