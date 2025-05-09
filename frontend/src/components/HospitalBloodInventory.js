import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import HospitalBloodTypeInventoryService from "../core/service/HospitalBloodTypeInventoryService";
import { ToastContainer, toast } from "react-toastify";
import RegistrationEmerFoot from "./RegistrationEmerFoot";
import RegistrationEmerNav from "./RegistrationEmerNav";

export default function HospitalBloodInventory() {
    const [hospitalBloodTypes, setHospitalBloodTypes] = useState([]);

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
                await getAllHospitalBloodTypesDetailsAsync();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (

        <div>
        <RegistrationEmerNav />

        <Box sx={{ maxWidth: 600, mx: "auto", my: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
            Hospital Blood Inventory
        </Typography>
            
            {hospitalBloodTypes.map((item, index) => (
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
        <RegistrationEmerFoot />

        </div>
    );
}
