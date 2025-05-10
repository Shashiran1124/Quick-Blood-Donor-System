import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Footer from './Footer';
import Navbar from './Navbar';

const DonAT = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const fetchAppointments = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/DonAppointments/`)
      .then((response) => {
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = appointments.filter((appointment) =>
      appointment.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAppointments(filtered);
    setPage(0); // Reset to first page on search
  }, [searchQuery, appointments]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    setAppointmentToDelete(id);
    setOpenDialog(true);
  };

  const deleteAppointment = () => {
    if (appointmentToDelete) {
      axios
        .delete(`http://localhost:5000/DonAppointments/delete/${appointmentToDelete}`)
        .then(() => {
          setAppointments(appointments.filter((appointment) => appointment._id !== appointmentToDelete));
          setFilteredAppointments(filteredAppointments.filter((appointment) => appointment._id !== appointmentToDelete));
          setOpenDialog(false);
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          setOpenDialog(false);
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentToDelete(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Navbar />

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" sx={{ color: '#B71C1C' }} gutterBottom>
          Blood Donation Appointments
        </Typography>

        <Divider sx={{ mb: 3, backgroundColor: '#EF9A9A' }} />

        <Box sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, contact, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#B71C1C' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#B71C1C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#B71C1C',
                },
              },
            }}
            aria-label="Search blood donation appointments"
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="blood donation appointments table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#FFCDD2' }}>
                    {[
                      "Donor Name", "Contact Number", "Age", "Gender", "Email", "Appointment Date", "Time Slot",
                      "Donation Type", "Donation Center", "On Medication", "Recent Illness",
                      "Recent Donation", "Recent Vaccination", "Action"
                    ].map((heading, index) => (
                      <TableCell key={index} align="center" sx={{ fontWeight: 'bold', color: '#B71C1C' }}>
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} align="center">
                        {searchQuery
                          ? "No appointments match your search."
                          : "No appointments found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAppointments
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((appointment, index) => (
                        <TableRow
                          key={appointment._id}
                          sx={{
                            backgroundColor: index % 2 === 0 ? '#FFF5F5' : '#FFFFFF',
                            '&:hover': { backgroundColor: '#FFEBEE' },
                          }}
                        >
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
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteClick(appointment._id)}
                              aria-label={`Delete appointment for ${appointment.donorName}`}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredAppointments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ paddingX: 2 }}
            />
          </Paper>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ backgroundColor: '#FFEBEE', color: '#B71C1C' }}>
            Delete Confirmation
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{ color: '#B71C1C', borderColor: '#B71C1C' }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={deleteAppointment} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Footer />
    </div>
  );
};

export default DonAT;