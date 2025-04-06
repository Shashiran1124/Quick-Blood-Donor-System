import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, dividerClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import RegistrationNav from './RegistrationNav';
import RegistrationFoot from './RegistrationFoot';


const AllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
          setDonors(donors.filter((donor) => donor._id !== id)); // Remove deleted donor from the state
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

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <div>
    <RegistrationNav></RegistrationNav>

    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        All Donors
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow  sx={{ backgroundColor: '#cbd6d5	' }}>
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
            {donors.map((donor) => (
              <TableRow key={donor._id}>
                <TableCell>{donor.userId}</TableCell>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>{donor.bloodType}</TableCell>
                <TableCell>{donor.location ? `Lat: ${donor.location.latitude}, Lon: ${donor.location.longitude}` : 'N/A'}</TableCell>
                <TableCell>{donor.address ? `${donor.address.street}, ${donor.address.city}, ${donor.address.district}, ${donor.address.province},${donor.address.postalcode}` : 'N/A'}</TableCell>
                <TableCell>{donor.createDate}</TableCell>

                <TableCell>
                  <Box display="flex" justifyContent="space-around" gap={1}>
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
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    <RegistrationFoot></RegistrationFoot>

    </div>
  );
};

export default AllDonors;
