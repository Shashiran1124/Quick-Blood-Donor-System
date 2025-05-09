import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Accordion, AccordionSummary, AccordionDetails, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import HospitalBloodTypeInventoryService from "../core/service/HospitalBloodTypeInventoryService";
import { ToastContainer, toast } from "react-toastify";
import RegistrationEmerFoot from "./RegistrationEmerFoot";
import RegistrationEmerNav from "./RegistrationEmerNav";

// ✅ import for dialog
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// ✅ import for PDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function HospitalBloodInventory() {
    const [hospitalBloodTypes, setHospitalBloodTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [emailsSent, setEmailsSent] = useState([]);

    useEffect(() => {
        getAllHospitalBloodTypesDetailsAsync();
    }, []);

    const getAllHospitalBloodTypesDetailsAsync = async () => {
        try {
            const response = await HospitalBloodTypeInventoryService.getAllHospitalBloodTypesDetailsAsync();
            setHospitalBloodTypes(response.data);
        } catch (error) {
            toast.error("Failed to load data.");
        }
    };

    const updateCount = (index, value) => {
        setHospitalBloodTypes((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, count: Math.max(0, item.count + value) } : item
            )
        );
    };

    const handleSubmit = async (item) => {
        try {
            const model = { id: item._id, count: item.count };
            const response = await HospitalBloodTypeInventoryService.updateBloodPacketCount(model);
            if (response.data.isSuccess) {
                toast.success(response.data.message);

                if (response.data.emailsSentTo && response.data.emailsSentTo.length > 0) {
                    setEmailsSent(response.data.emailsSentTo);
                    setOpenDialog(true);
                }

                await getAllHospitalBloodTypesDetailsAsync();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    // ✅ PDF generation function
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Hospital Blood Inventory Report", 14, 20);
        doc.text("QuickBlood", 165, 20);
        const tableColumn = ["Blood Type", "Units Available"];
        const tableRows = hospitalBloodTypes.map(item => [item.bloodType, item.count]);

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: "striped",
            styles: { halign: 'center' },
            headStyles: { fillColor: [220, 53, 69] },
        });

        doc.save("Blood_Inventory_Report.pdf");
    };

    const filteredBloodTypes = hospitalBloodTypes.filter(item =>
        item.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <RegistrationEmerNav />

            {/* ✅ moved button to top-left */}
             <Box sx={{ position: 'absolute', top: '70px', right: '20px', zIndex: 999 }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDownloadPDF}
                >
                    Download Blood Inventory PDF
                </Button>
            </Box>

            <Box sx={{ maxWidth: 600, mx: "auto", my: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Hospital Blood Inventory
                </Typography>

                <TextField
                    label="Search Blood Type (e.g., A+)"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {filteredBloodTypes.map((item, index) => (
                    <Card key={index} sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Accordion sx={{ borderRadius: 2 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel${index}-header`}>
                                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                        {item.bloodType}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                        onClick={() => handleSubmit(item)}
                                    >
                                        Save
                                    </Button>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography variant="subtitle1">Blood Type: {item.bloodType}</Typography>
                                    <Typography variant="subtitle1">Units Available: {item.count}</Typography>

                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                startIcon={<AddIcon />}
                                                onClick={() => updateCount(index, 1)}
                                            >
                                                Add
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<RemoveIcon />}
                                                onClick={() => updateCount(index, -1)}
                                                disabled={item.count === 0}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}

                <ToastContainer />
            </Box>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#ffe6e6',
                        border: '2px solid #ff9999',
                        borderRadius: 3,
                        boxShadow: 6
                    }
                }}
            >
                <DialogTitle sx={{ color: '#b71c1c', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Emails sent to these donors
                </DialogTitle>
                <DialogContent dividers>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                        {emailsSent.map((EmergencyDoners, index) => (
                            <li key={index} style={{ color: '#d32f2f', fontWeight: 500 }}>{EmergencyDoners}</li>
                        ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            backgroundColor: '#ef5350',
                            color: '#fff',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#c62828'
                            }
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <RegistrationEmerFoot />
        </div>
    );
}
