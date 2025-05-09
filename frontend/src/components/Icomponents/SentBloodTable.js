import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BloodTableImage from '../../images/bloodTable.jpg';

export default function SentBloodTable() {
  const [sentBlood, setSentBlood] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'bloodType', direction: 'asc' });
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

  // Sorting function
  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedData = [...sentBlood].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (key === 'sentDate') {
        valueA = new Date(a[key]);
        valueB = new Date(b[key]);
      } else if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSentBlood(sortedData);
  };

  // Filter records based on search query
  const filteredSentBlood = sentBlood.filter(item =>
    item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    return utcDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  // Check if sent date is outdated (more than 30 days ago)
  const getSentStatus = (sentDate) => {
    const today = new Date();
    const sent = new Date(sentDate);
    const diffDays = Math.ceil((today - sent) / (1000 * 60 * 60 * 24));
    return diffDays > 30 ? 'outdated' : 'recent';
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        minHeight: '180vh',
        paddingBottom: '40px',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <style>
        {`
          .table-container {
            width: 80%;
            margin: 0 auto;
            overflow-x: auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            background-color: #fff;
          }
          .sent-table {
            width: 100%;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
          }
          .sent-table th {
            background-color: #100d36;
            color: #fff;
            font-weight: bold;
            padding: 15px;
            border: 2px solid #000000;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .sent-table th:hover {
            background-color: #1c1a5a;
          }
          .sent-table td {
            padding: 12px;
            border: 1px solid #ddd;
            color: #333;
            text-align: center;
          }
          .sent-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .sent-table tr:hover {
            background-color: #f1f1f1;
            transition: background-color 0.3s ease;
          }
          .search-input {
            padding: 12px;
            width: 300px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .search-input:focus {
            border-color: #ff4d4f;
          }
          .action-btn {
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.3s ease, transform 0.1s ease;
            margin: 0 4px;
          }
          .action-btn:hover {
            transform: scale(1.05);
          }
          .update-btn {
            background-color: #0711fe;
            color: #fff;
          }
          .update-btn:hover {
            background-color: #0a1cd6;
          }
          .delete-btn {
            background-color: #fc0707;
            color: #fff;
          }
          .delete-btn:hover {
            background-color: #d40606;
          }
          .outdated {
            background-color: #ffcccc;
            color: #d00000;
            font-weight: bold;
          }
          .recent {
            background-color: #ffffff;
          }
          .loading-spinner {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #ff4d4f;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .no-records {
            text-align: center;
            color: #666;
            padding: 20px;
            background-color: #BFBFBF;
            border-radius: 5px;
            font-style: italic;
          }
          @media (max-width: 768px) {
            .table-container {
              width: 90%;
            }
            .sent-table th, .sent-table td {
              padding: 8px;
              font-size: 14px;
            }
            .search-input {
              width: 90%;
              max-width: 300px;
            }
          }
        `}
      </style>

      {/* Navigation Bar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
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
          >
            Reports
          </a>
        </div>
      </nav>

      <h1 style={{ margin: '20px 0', color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>
        Sent Blood Records
      </h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by Blood Type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : filteredSentBlood.length === 0 ? (
        <div className="no-records">
          {searchQuery ? "No records found for your search." : "No sent blood records available."}
        </div>
      ) : (
        <div className="table-container">
          <table className="sent-table">
            <thead>
              <tr>
                <th onClick={() => sortData('bloodType')}>
                  Blood Type {sortConfig.key === 'bloodType' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortData('sentUnits')}>
                  Sent Units {sortConfig.key === 'sentUnits' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortData('sentDate')}>
                  Sent Date {sortConfig.key === 'sentDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortData('sentID')}>
                  Sent ID {sortConfig.key === 'sentID' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => sortData('status')}>
                  Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSentBlood.map((item) => {
                const sentStatus = getSentStatus(item.sentDate);
                return (
                  <tr key={item._id}>
                    <td>{item.bloodType}</td>
                    <td>{item.sentUnits}</td>
                    <td className={sentStatus}>
                      {formatDate(item.sentDate)}
                      {sentStatus === 'outdated' && ' (Outdated)'}
                    </td>
                    <td>{item.sentID}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(item)}
                        className="action-btn update-btn"
                        title="Update this record"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="action-btn delete-btn"
                        title="Delete this record"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}