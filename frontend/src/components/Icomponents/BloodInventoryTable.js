import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BloodTableImage from '../../images/bloodTable.jpg'; // Import the transparent image

export default function BloodInventoryTable() {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch blood inventory from the server
  const fetchBloodInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blood-inventory/');
      const result = await response.json();
      console.log("Fetched Result:", result); // Log the response
  
      if (response.ok) {
        if (result.data) {
          console.log("Inventory Data:", result.data); // Log the data if it exists
          setBloodInventory(result.data); // Set the state with the data
        } else {
          console.error("No data found in the response");
        }
      } else {
        console.error("Failed to fetch blood inventory:", result.message);
      }
    } catch (error) {
      console.error("Error fetching blood inventory:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchBloodInventory(); // Fetch the inventory on component mount
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Navigate to update form with selected blood inventory data
  const handleUpdate = (item) => {
    navigate('/dashBloodInventoryForm', { state: { item } });
  };

 // Delete a blood inventory record
// Delete a blood inventory record
const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/blood-inventory/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchBloodInventory(); // Refresh the blood inventory list
      alert('Blood inventory record deleted successfully');
    } else {
      const errorData = await response.json();
      alert(`Failed to delete: ${errorData.message || errorData.error}`);
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('An error occurred while deleting the record. Please check the console for more details.');
  }
};



  // Filter inventory based on search query
  const filteredInventory = bloodInventory.filter(item =>
    item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div
   
     >
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
        objectFit: 'cover', // Ensure the image covers the entire area
        opacity: 0.15, // Adjust transparency (0 to 1, 0.5 for moderate transparency)
        zIndex: 10, // Behind the content but above the white background
        pointerEvents: 'none', // Prevent the image from blocking interactions
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
            onClick={() => navigate('/dashBloodInventoryForm')} // Navigate to Add Form
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
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center',fontWeight: 'bold' }}>Blood Inventory</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft: '30px' }}>
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
        <table style={{ width: '70%', borderCollapse: 'collapse', border: '1px solid #000000',marginLeft: '160px' }}>
          <thead>
            <tr style={{ backgroundColor: '#100d36', color: '#fff' }}>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Blood Type</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Units Available</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Donation Date</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Expiration Date</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Donor ID</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Status</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id} style={{ backgroundColor: '#BFBFBF' }}>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.bloodType}</td>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.unitsAvailable}</td>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{new Date(item.donationDate).toLocaleDateString()}</td>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{new Date(item.expirationDate).toLocaleDateString()}</td>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.donorID || 'N/A'}</td>
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
  onClick={() => handleDelete(item._id)} // Pass the id instead of bloodType
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
