import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BloodTableImage from '../../images/bloodTable.jpg'; // Import the transparent image

export default function BloodInventoryPage() {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [sentBlood, setSentBlood] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch blood inventory (Received blood) from the server
  const fetchBloodInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blood-inventory/');
      const result = await response.json();
      if (response.ok && result.data) {
        setBloodInventory(result.data);
      } else {
        console.error("Failed to fetch blood inventory:", result.message);
      }
    } catch (error) {
      console.error("Error fetching blood inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sent blood records from the server
  const fetchSentBlood = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sent-blood/');
      const result = await response.json();
      setSentBlood(result.data || []);
    } catch (error) {
      console.error("Error fetching sent blood records:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBloodInventory();
    fetchSentBlood();
  }, [fetchSentBlood]);

  // Group inventory by blood type and sum units
  const groupedInventory = () => {
    const grouped = bloodInventory.reduce((acc, item) => {
      const { bloodType, unitsAvailable } = item;
      if (!acc[bloodType]) {
        acc[bloodType] = { bloodType, unitsAvailable: 0 };
      }
      acc[bloodType].unitsAvailable += unitsAvailable;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  // Group sent blood by blood type and sum sent units
  const groupedSentBlood = () => {
    const grouped = sentBlood.reduce((acc, item) => {
      const { bloodType, sentUnits } = item;
      if (!acc[bloodType]) {
        acc[bloodType] = { bloodType, sentUnits: 0 };
      }
      acc[bloodType].sentUnits += sentUnits;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  // Filter blood inventory and sent blood based on search query
  const filteredInventory = groupedInventory().filter(item =>
    item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSentBlood = groupedSentBlood().filter(item =>
    item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate remaining blood (Received - Sent)
  const calculateRemainingBlood = () => {
    const inventoryMap = groupedInventory().reduce((acc, item) => {
      acc[item.bloodType] = item.unitsAvailable;
      return acc;
    }, {});

    const sentMap = groupedSentBlood().reduce((acc, item) => {
      acc[item.bloodType] = item.sentUnits;
      return acc;
    }, {});

    const remainingBlood = Object.keys(inventoryMap).map(bloodType => {
      const unitsAvailable = inventoryMap[bloodType] || 0;
      const sentUnits = sentMap[bloodType] || 0;
      return {
        bloodType,
        remainingUnits: unitsAvailable - sentUnits,
      };
    });

    return remainingBlood;
  };

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
          opacity: 0.12,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1a2a44' }}>
        {/* Navigation content */}
      </nav>

      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>Blood Inventory</h1>

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
            marginRight: '10px'
          }}
        />
      </div>

      {/* Blood Received Table */}
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Blood Inventory (Received)</h2>
      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <table style={{ width: '50%', borderCollapse: 'collapse', margin: '0 auto', border: '1px solid #000000' }}>
          <thead>
            <tr style={{ backgroundColor: '#7D2CE0', color: '#fff' }}>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Blood Type</th>
              <th style={{ border: '2.2px solid #000000', padding: '12px' }}>Units Available</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.bloodType} style={{ backgroundColor: '#BFBFBF' }}>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.bloodType}</td>
                <td style={{ border: '2.2px solid #000000', padding: '12px' }}>{item.unitsAvailable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Blood Sent Table */}
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '40px' }}>Sent Blood Records</h2>
      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <table style={{ width: '50%', borderCollapse: 'collapse', margin: '20px auto', border: '1px solid #000000' }}>
          <thead>
            <tr style={{ backgroundColor: '#7D2CE0', color: '#fff' }}>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Blood Type</th>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Total Sent Units</th>
            </tr>
          </thead>
          <tbody>
            {filteredSentBlood.length > 0 ? (
              filteredSentBlood.map((item) => (
                <tr key={item.bloodType}>
                  <td style={{ border: '1px solid #000', padding: '12px' }}>{item.bloodType}</td>
                  <td style={{ border: '1px solid #000', padding: '12px' }}>{item.sentUnits}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '12px' }}>No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Remaining Blood Table */}
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '40px' }}>Remaining Blood Inventory</h2>
      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <table style={{ width: '50%', borderCollapse: 'collapse', margin: '20px auto', border: '1px solid #000000' }}>
          <thead>
            <tr style={{ backgroundColor: '#900C3F ', color: '#fff' }}>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Blood Type</th>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Remaining Units</th>
            </tr>
          </thead>
          <tbody>
            {calculateRemainingBlood().map((item) => (
              <tr key={item.bloodType}>
                <td style={{ border: '1px solid #000', padding: '12px' }}>{item.bloodType}</td>
                <td style={{ border: '1px solid #000', padding: '12px' }}>{item.remainingUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
