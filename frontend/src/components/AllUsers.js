import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegistrationNav from './RegistrationNav';
import RegistrationFoot from './RegistrationFoot';
import jsPDF from 'jspdf'; // ✅ added import

const AllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch('http://localhost:5000/donors/all');
        const data = await response.json();
        if (response.ok) {
          setDonors(data);
        } else {
          setError(data.message || 'Failed to load donors.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        const response = await fetch(`http://localhost:5000/donors/delete/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          setDonors(donors.filter((donor) => donor._id !== id));
        } else {
          setError(data.message || 'Failed to delete donor.');
        }
      } catch (err) {
        setError('An error occurred while deleting data.');
      }
    }
  };

   const handleUpdate = (id) => {
    console.log("Navigating to update form with ID:", id);
    navigate(`/userUpdateForm/${id}`);
 

  };





    const handleGeneratePDF = (donor) => {
    const doc = new jsPDF();
  
    // ✅ Right-side big title
    doc.setFontSize(30);
    doc.text('DONOR INFO', 150, 30, null, null, 'center');
  
    // ✅ Left-side hospital info (moved down to avoid overlapping)
    doc.setFontSize(12);
    let yLeft = 20;
    doc.text('Quick Blood Donation Center', 20, yLeft); yLeft += 6;
    doc.text('123 Blood Drive Street', 20, yLeft); yLeft += 6;
    doc.text('Colombo, Western Province', 20, yLeft); yLeft += 6;
    doc.text('Phone: +94 123 4567', 20, yLeft); yLeft += 6;
    doc.text('Email: info@quickblood.com', 20, yLeft);
  
    // ✅ Horizontal line under header
    const lineY = Math.max(yLeft + 6, 40);
    doc.setDrawColor(255, 0, 0); // RED COLOR
    doc.setLineWidth(0.8);
    doc.line(20, lineY, 190, lineY);
  
    // ✅ Donor details title
    doc.setFontSize(14);
    const detailsTitleY = lineY + 10;
    doc.text(`Donor Details Report`, 20, detailsTitleY);
  
    // ✅ Another line under details title
    doc.setLineWidth(0.5);
    doc.setDrawColor(255, 0, 0); // RED COLOR
    doc.line(20, detailsTitleY + 3, 190, detailsTitleY + 3);
  
    // ✅ Donor information
    doc.setFontSize(12);
    let y = detailsTitleY + 15;
    doc.text(`User ID: ${donor.userId}`, 20, y); y += 8;
    doc.text(`Name: ${donor.name}`, 20, y); y += 8;
    doc.text(`Email: ${donor.email}`, 20, y); y += 8;
    doc.text(`Blood Type: ${donor.bloodType}`, 20, y); y += 8;
    doc.text(`Location: ${donor.location ? `Lat: ${donor.location.latitude}, Lon: ${donor.location.longitude}` : 'N/A'}`, 20, y); y += 8;
    doc.text(`Address: ${donor.address ? `${donor.address.street}, ${donor.address.city}, ${donor.address.district}, ${donor.address.province}, ${donor.address.postalcode}` : 'N/A'}`, 20, y); y += 8;
    doc.text(`Create Date: ${donor.createDate}`, 20, y);
  
    // ✅ Save PDF
    doc.save(`Donor_${donor.name.replace(/\s/g, '_')}.pdf`);
  };
  

  const filteredDonors = donors.filter((donor) =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <div>
      <RegistrationNav />

      <Box display="flex" justifyContent="flex-start" my={2}>
        <TextField
          label="Search by Name "
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '50%' }}
        />
      </Box>

      <Container maxWidth={false}>

        <Typography variant="h4" align="center" gutterBottom>
          All Donors
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#cbd6d5' }}>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Blood Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDonors.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell>{donor.userId}</TableCell>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.email}</TableCell>
                  <TableCell>{donor.bloodType}</TableCell>
                  <TableCell>{donor.location ? `Lat: ${donor.location.latitude}, Lon: ${donor.location.longitude}` : 'N/A'}</TableCell>
                  <TableCell>{donor.address ? `${donor.address.street}, ${donor.address.city}, ${donor.address.district}, ${donor.address.province},${donor.address.postalcode}` : 'N/A'}</TableCell>
                  <TableCell>{donor.createDate}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-around" gap={1} flexWrap="wrap">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(donor._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(donor._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleGeneratePDF(donor)}
                      >
                        Generate PDF
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <RegistrationFoot />
    </div>
  );
};

export default AllDonors;
