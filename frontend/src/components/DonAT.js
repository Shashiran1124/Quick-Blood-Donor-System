import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from './Footer';
import Navbar from './Navbar';

const DonAT = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // Fetch data from the backend on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/DonAppointments/`)
      .then(response => {
        setAppointments(response.data); // Assuming the data is an array of appointments
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open the delete confirmation dialog
  const handleDeleteClick = (id) => {
    setAppointmentToDelete(id);
    setOpenDialog(true);
  };

  // Delete an appointment by ID
  const deleteAppointment = () => {
    if (appointmentToDelete) {
      axios.delete(`http://localhost:5000/DonAppointments/delete/${appointmentToDelete}`)
        .then((response) => {
          // Remove the deleted appointment from the state
          setAppointments(appointments.filter(appointment => appointment._id !== appointmentToDelete));
          setOpenDialog(false);
          console.log(response.data.message); // Handle success message if needed
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          setOpenDialog(false);
        });
    }
  };

  // Close the delete confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentToDelete(null);
  };

  return (
    <div>
    <Navbar></Navbar>
    
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Blood Donation Appointments
      </Typography>
      

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="donation appointments table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f1f1f1' }}>
                <TableCell align="center"><strong>Donor Name</strong></TableCell>
                <TableCell align="center"><strong>Contact Number</strong></TableCell>
                <TableCell align="center"><strong>Age</strong></TableCell>
                <TableCell align="center"><strong>Gender</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Appointment Date</strong></TableCell>
                <TableCell align="center"><strong>Time Slot</strong></TableCell>
                <TableCell align="center"><strong>Donation Type</strong></TableCell>
                <TableCell align="center"><strong>Donation Center</strong></TableCell>
                <TableCell align="center"><strong>On Medication</strong></TableCell>
                <TableCell align="center"><strong>Recent Illness</strong></TableCell>
                <TableCell align="center"><strong>Recent Donation</strong></TableCell>
                <TableCell align="center"><strong>Recent Vaccination</strong></TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} align="center">
                    No appointments found.
                  </TableCell>
                </TableRow>
              ) : (
                appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment, index) => (
                  <TableRow key={appointment._id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <TableCell align="center">{appointment.donorName}</TableCell>
                    <TableCell align="center">{appointment.contactNumber}</TableCell>
                    <TableCell align="center">{appointment.age}</TableCell>
                    <TableCell align="center">{appointment.gender}</TableCell>
                    <TableCell align="center">{appointment.email}</TableCell>
                    <TableCell align="center">{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{appointment.timeSlot}</TableCell>
                    <TableCell align="center">{appointment.donationType}</TableCell>
                    <TableCell align="center">{appointment.donationCenter}</TableCell>
                    <TableCell align="center">{appointment.onMedication ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">{appointment.recentIllness ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">{appointment.recentDonation ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">{appointment.recentVaccination ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDeleteClick(appointment._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ padding: 2 }}
          />
        </TableContainer>
        
      )}
      

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this appointment?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAppointment} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    <Footer></Footer>
    </div>
    
  
    
  );
};


export default DonAT;
