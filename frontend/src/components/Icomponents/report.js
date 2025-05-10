import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Report() {
  const [sentBlood, setSentBlood] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch sent blood records from the server
  const fetchSentBlood = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sent-blood/');
      const result = await response.json();
      if (response.ok && result.data) {
        setSentBlood(result.data || []);
      } else {
        console.error("Failed to fetch sent blood records:", result.message);
      }
    } catch (error) {
      console.error("Error fetching sent blood records:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSentBlood();
  }, [fetchSentBlood]);

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

  // Generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add titles (centered)
    doc.setFontSize(18);
    doc.text('QuickBlood Donation System', 14, 20);
    doc.setFontSize(15);
    doc.text('Blood Release Report', 14, 30);

    // Apply autoTable plugin to jsPDF instance
    autoTable(doc, {
      startY: 40, // Start below the titles
      head: [['Blood Type', 'Total Sent Units']],
      body: groupedSentBlood().map(item => [item.bloodType, item.sentUnits.toString()]),
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 128], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Add signature of Director of Nursing on the left side, followed by the date
    const signatureY = doc.lastAutoTable.finalY + 10; // Add blank line before signature
    doc.text('_____________', 14, signatureY + 5); // Blank line for signature
    doc.setFontSize(12);
    doc.setFont('times', 'italic');
    doc.text('Mr. Malindu Nethmina', 14, signatureY + 15); // Adjusted to below the blank line
    doc.setFont('times', 'normal');
    doc.text('(Director of Nursing)', 14, signatureY + 25); // Adjusted spacing
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, signatureY + 35); // Adjusted spacing

    doc.save('Blood_Release_Report.pdf');
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>
        {`
          .table-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 0 20px;
          }
          .no-results {
            text-align: center;
            color: #000;
            padding: 20px;
          }
        `}
      </style>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.5rem 2rem',
          width: '1500px',
          marginLeft: '-30px',
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
          >
            Report
          </a>
        </div>
      </nav>

      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#000000', mt: 4, fontWeight: 'bold' }}
      >
        QuickBlood Donation System
      </Typography>
      <Typography
        variant="h5"
        align="center"
        sx={{ color: '#000000', mb: 4, fontWeight: 'bold' }}
      >
        Blood Release Report
      </Typography>

      <div className="table-container">
        {loading ? (
          <Typography align="center" sx={{ color: '#000' }}>
            Loading...
          </Typography>
        ) : groupedSentBlood().length > 0 ? (
          <>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: '8px', border: '1px solid #000000' }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#00008B' }}>
                    <TableCell sx={{ color: '#fff', border: '2px solid #000', py: 1.5 }}>
                      Blood Type
                    </TableCell>
                    <TableCell sx={{ color: '#fff', border: '2px solid #000', py: 1.5 }}>
                      Total Sent Units
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedSentBlood().map((item) => (
                    <TableRow key={item.bloodType} sx={{ backgroundColor: '#fff' }}>
                      <TableCell sx={{ border: '2px solid #000', py: 1.5, color: '#000' }}>
                        {item.bloodType}
                      </TableCell>
                      <TableCell sx={{ border: '2px solid #000', py: 1.5, color: '#000' }}>
                        {item.sentUnits}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={downloadPDF}
                sx={{
                  backgroundColor: '#ff4d4f',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#c71800' },
                  padding: '10px 20px',
                }}
              >
                Download PDF
              </Button>
            </Box>
          </>
        ) : (
          <div className="no-results">No results found.</div>
        )}
      </div>
    </div>
  );
}