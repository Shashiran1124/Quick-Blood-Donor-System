import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const AppointmentConfirmation = () => {
  const [appointments, setAppointments] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.formData || null);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // Debug log
  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  // Fetch appointments and find match by contact + date if _id is missing
  useEffect(() => {
    axios.get(`http://localhost:5000/DonAppointments/`)
      .then(response => {
        setAppointments(response.data);
        

        // If _id is missing, try to find the appointment from list
        if (formData && !formData._id) {
          const match = response.data.find(
            a =>
              a.contactNumber === formData.contactNumber &&
              new Date(a.appointmentDate).toISOString() === new Date(formData.appointmentDate).toISOString()
          );
          if (match) {
            setFormData({ ...formData, _id: match._id }); // Update with _id
          }
        }
      })
      
  });

  const handleReschedule = () => {
    navigate('/', { state: { appointment: formData } });
  };

  const handleDeleteClick = (id) => {
    setAppointmentToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentToDelete(null);
  };

  const deleteAppointment = () => {
    if (appointmentToDelete) {
      axios.delete(`http://localhost:5000/DonAppointments/delete/${appointmentToDelete}`)
        .then((response) => {
          setAppointments(appointments.filter(appointment => appointment._id !== appointmentToDelete));
          setOpenDialog(false);
          console.log(response.data.message);
          navigate('/'); // Redirect after deletion
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          setOpenDialog(false);
        });
    }
  };

  if (!formData) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px', color: 'red' }}>
        No appointment data found.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <h2>Appointment Confirmed</h2>

      <p><strong>Donor Name:</strong> {formData.donorName}</p>
      <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
      <p><strong>Appointment Date:</strong> {new Date(formData.appointmentDate).toLocaleDateString()}</p>

      <button
        onClick={handleReschedule}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Re-schedule
      </button>

      <button
        onClick={() => handleDeleteClick(formData._id)}
        disabled={!formData._id}
        style={{
          marginTop: '20px',
          marginLeft: '10px',
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          opacity: formData._id ? 1 : 0.5
        }}
      >
        Delete
      </button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your appointment?
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
    </div>
  );
};

export default AppointmentConfirmation;
