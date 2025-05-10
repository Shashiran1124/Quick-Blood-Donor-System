import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BloodTableImage from '../../images/bloodTable.jpg';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  LinearProgress,
  Box,
  Tooltip,
} from '@mui/material';

export default function BloodInventoryPage() {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [sentBlood, setSentBlood] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [donorDetails, setDonorDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch blood inventory (Received blood) from the server
  const fetchBloodInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blood-inventory/');
      const result = await response.json();
      if (response.ok && result.data) {
        setBloodInventory(result.data);
        console.log("Blood Inventory Data:", result.data);
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

  // Update donor details when a blood type is selected
  const updateDonorDetails = (bloodType) => {
    console.log("Selected Blood Type:", bloodType);
    if (bloodType) {
      const details = bloodInventory.filter(item => item.bloodType === bloodType);
      console.log("Filtered Donor Details:", details);
      setDonorDetails(details);
    } else {
      setDonorDetails([]);
    }
  };

  useEffect(() => {
    fetchBloodInventory();
    fetchSentBlood();
  }, [fetchSentBlood]);

  useEffect(() => {
    updateDonorDetails(selectedBloodType);
  }, [selectedBloodType, bloodInventory]);

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

  // Format date to user-friendly string (date only)
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Enhanced search function for tables
  const searchInventory = (data) => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item => {
      const formattedDate = formatDate(item.donationDate || '').toLowerCase();
      return (
        item.bloodType.toLowerCase().includes(query) ||
        (item.donorID && item.donorID.toLowerCase().includes(query)) ||
        formattedDate.includes(query)
      );
    });
  };

  // Filter blood inventory based on search
  const filteredInventory = searchInventory(bloodInventory).reduce((acc, item) => {
    if (!acc[item.bloodType]) {
      acc[item.bloodType] = { bloodType: item.bloodType, unitsAvailable: 0 };
    }
    acc[item.bloodType].unitsAvailable += item.unitsAvailable;
    return acc;
  }, {});

  // Filter sent blood based on search
  const filteredSentBlood = searchInventory(sentBlood).reduce((acc, item) => {
    if (!acc[item.bloodType]) {
      acc[item.bloodType] = { bloodType: item.bloodType, sentUnits: 0 };
    }
    acc[item.bloodType].sentUnits += item.sentUnits;
    return acc;
  }, {});

  // Calculate remaining blood based on filtered data
  const calculateRemainingBlood = () => {
    const inventoryMap = Object.values(filteredInventory).reduce((acc, item) => {
      acc[item.bloodType] = item.unitsAvailable;
      return acc;
    }, {});
    const sentMap = Object.values(filteredSentBlood).reduce((acc, item) => {
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

  // Prepare data for blood type cards (filtered by bloodType only)
  const allBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const remainingBloodData = calculateRemainingBlood();
  const bloodTypeCardsData = allBloodTypes
    .filter(bloodType => !searchQuery || bloodType.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(bloodType => {
      const remainingEntry = remainingBloodData.find(item => item.bloodType === bloodType);
      return {
        bloodType,
        remainingUnits: remainingEntry ? remainingEntry.remainingUnits : 0,
      };
    });

  // Handle card click to open modal
  const handleCardClick = (bloodType) => {
    setSelectedBloodType(bloodType === selectedBloodType ? null : bloodType);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBloodType(null);
  };

  // Function to determine stock level bar color and status
  const getStockLevelProps = (remainingUnits) => {
    const maxUnits = 1000; // Adjusted maxUnits to accommodate the data range
    const value = Math.min((remainingUnits / maxUnits) * 100, 100); // Normalize to 0-100%
    let color, status;
    if (remainingUnits < 250) {
      color = '#ff0000'; // Red for low stock (< 250 units)
      status = 'Low Stock';
    } else {
      color = '#00ff00'; // Green for sufficient stock (>= 250 units)
      status = 'Sufficient Stock';
    }
    return { value, color, status };
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <style>
        {`
          .table-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          @media (max-width: 768px) {
            .table-grid {
              grid-template-columns: 1fr;
            }
          }
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(250px, 1fr)); /* 4 cards per row, increased size */
            gap: 30px; /* Increased gap between cards */
            max-width: 1200px;
            margin: 0 auto 40px auto;
            padding: 0 20px;
          }
          @media (max-width: 768px) {
            .cards-grid {
              grid-template-columns: repeat(2, minmax(250px, 1fr)); /* 2 cards per row on smaller screens */
            }
          }
          .donor-details {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
          }
          .donor-details ul {
            list-style: none;
            padding: 0;
          }
          .donor-details li {
            background-color:rgb(247, 246, 246);
            border: 1px solid #000;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            color: #000;
          }
          .donor-details li div {
            margin-left: 20px;
          }
          /* Modal Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            zIndex: 1000;
          }
          .modal-content {
            background-color: #A0A0A0;
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .modal-content h2 {
            color: #c71800;
            text-align: center;
            margin-bottom: 20px;
          }
          .modal-content table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .modal-content th, .modal-content td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
          }
          .modal-content th {
            background-color: #000459;
            color: #fff;
          }
          .modal-content td {
            color: #000;
          }
          .modal-close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #ff4d4f;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .modal-close-btn:hover {
            background-color: #c71800;
          }
          .no-results {
            text-align: center;
            color: #000;
            padding: 20px;
          }
          .card-top {
            background-color: rgb(221, 51, 29);
            padding: 15px; /* Increased padding */
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            text-align: center;
          }
          .card-bottom {
            background-color: #ffffff;
            padding: 15px; /* Increased padding */
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            text-align: center;
          }
        `}
      </style>

      <div
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

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.5rem 2rem',
          width: '1490px',
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
            onClick={() => navigate('/HomePageInventory')}
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
            onClick={() => navigate('/Dashinvlevel')}
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
            onClick={() => navigate('/report')}
          >
            Report
          </a>
        </div>
      </nav>

      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center', fontWeight: 'bold', fontSize: '40px' }}>
        Blood Stock Status Overview
      </h1>

      {/* Blood Type Cards */}
      <div className="cards-grid">
        {bloodTypeCardsData.length > 0 ? (
          bloodTypeCardsData.map((item) => {
            const { value, color, status } = getStockLevelProps(item.remainingUnits);
            return (
              <div
                key={item.bloodType}
                style={{
                  backgroundColor: selectedBloodType === item.bloodType ? '#636363' : '#A0A0A0',
                  border: '3px solid #900C3F',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                  cursor: 'pointer',
                  width: '100%',
                }}
                onMouseOver={(e) => {
                  if (selectedBloodType !== item.bloodType) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.backgroundColor = '#636363';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedBloodType !== item.bloodType) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = selectedBloodType === item.bloodType ? '#636363' : '#A0A0A0';
                  }
                }}
                onClick={() => handleCardClick(item.bloodType)}
              >
                <div className="card-top">
                  <h3 style={{ margin: '0', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
                    <span style={{ marginRight: '5px' }}>🩸</span>{item.bloodType}
                  </h3>
                </div>
                <div className="card-bottom">
                  {item.remainingUnits > 0 ? (
                    <p style={{ margin: '0 0 8px 0', color: '#0b1a45', fontSize: '16px', fontWeight: 'bold' }}>
                      Remaining: {item.remainingUnits} units
                    </p>
                  ) : (
                    <p style={{ margin: '0 0 8px 0', color: '#0b1a45', fontSize: '16px', fontWeight: 'bold' }}>
                      Unavailable
                    </p>
                  )}
                  <Tooltip title={status} arrow>
                    <Box sx={{ width: '80%', mx: 'auto' }}>
                      <LinearProgress
                        variant="determinate"
                        value={value}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: color + '!important', // Ensure color applies
                          },
                        }}
                      />
                    </Box>
                  </Tooltip>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">No results found.</div>
        )}
      </div>
      {/* Commented out duplicate nav to fix syntax error */}
      {/* <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', backgroundColor: '#1a2a44' }}>
        {/* Navigation content */}
      {/* </nav> */}

      <h1 style={{ marginBottom: '21px', color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>Blood Inventory</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by Blood Type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '17px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            marginRight: '10px'
          }}
        />
      </div>

      {/* Modal for Donor Details */}
      {isModalOpen && selectedBloodType && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={closeModal}>
              Close
            </button>
            <h2>Donor Details for {selectedBloodType}</h2>
            {donorDetails.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#000' }}>
                No donor details found for {selectedBloodType}.
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>NIC</th>
                    <th>Donation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donorDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{item.donorID || 'N/A'}</td>
                      <td>{formatDate(item.donationDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tables */}
      <div className="table-grid">
        <div>
          <Typography variant="h5" align="center" sx={{ color: '#008000', mb: 3, fontWeight: 'bold' }}>
            BloodIN
          </Typography>
          {loading ? (
            <Typography align="center" sx={{ color: '#000' }}>
              Loading...
            </Typography>
          ) : Object.values(filteredInventory).length > 0 ? (
            <TableContainer component={Paper} sx={{ borderRadius: '8px', border: '1px solid #000000', maxWidth: '360px', marginLeft: '150px' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#000' }}>
                    <TableCell sx={{ color: '#fff', border: '2px solid #000', py: 1.5 }}>Blood Type</TableCell>
                    <TableCell sx={{ color: '#fff', border: '2px solid #000', py: 1.5 }}>Units Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(filteredInventory).map((item) => (
                    <TableRow key={item.bloodType} sx={{ backgroundColor: '#fff' }}>
                      <TableCell sx={{ border: '2px solid #000', py: 1.5, color: '#000' }}>{item.bloodType}</TableCell>
                      <TableCell sx={{ border: '2px solid #000', py: 1.5, color: '#000' }}>{item.unitsAvailable}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="no-results">No results found.</div>
          )}
        </div>

        <div>
          <Typography variant="h5" align="center" sx={{ color: '#008000', mb: 3, fontWeight: 'bold' }}>
            BloodOUT
          </Typography>
          {loading ? (
            <Typography align="center" sx={{ color: '#000' }}>
              Loading...
            </Typography>
          ) : Object.values(filteredSentBlood).length > 0 ? (
            <TableContainer component={Paper} sx={{ borderRadius: '8px', border: '1px solid #000000', maxWidth: '350px', marginLeft: '130px' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#000000' }}>
                    <TableCell sx={{ color: '#fff', border: '2px solid #000', py: 1.5 }}>Blood Type</TableCell>
                    <TableCell sx={{ color: '#fff', border: '2px solid #000', py: 1.5 }}>Total Sent Units</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(filteredSentBlood).map((item) => (
                    <TableRow key={item.bloodType} sx={{ backgroundColor: '#fff' }}>
                      <TableCell sx={{ border: '2px solid #000', py: 1.5, color: '#000' }}>{item.bloodType}</TableCell>
                      <TableCell sx={{ border: '2px solid #000', py: 1.5, color: '#000' }}>{item.sentUnits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="no-results">No results found.</div>
          )}
        </div>
      </div>

      {/* Donor Details in Leveled List Format (Retained but hidden by default) */}
      {selectedBloodType && (
        <div className="donor-details">
          <h2 style={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>
            Donor Details for {selectedBloodType}
          </h2>
          {donorDetails.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#fff' }}>
              No donor details found for {selectedBloodType}.
            </div>
          ) : (
            <ul>
              {donorDetails.map((item, index) => (
                <li key={index}>
                  <strong>Donor Entry {index + 1}</strong>
                  <div>
                    <strong>NIC:</strong> {item.donorID || 'N/A'}
                  </div>
                  <div>
                    <strong>Donation Date:</strong> {formatDate(item.donationDate)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}