import { Box, Grid } from "@mui/material";
import SentBloodTable from "./SentBloodTable";





const DashSentBloodTable = () => {
    return (
        <Grid container>
            <Grid item>
                {/*<Osidebar/>*/}
            </Grid>
            <Grid item xs>
                {/*<Navbar />*/}
                <Box 
                    sx={{ 
                        padding: "20px", 
                        backgroundColor: "#e0e0e0", // This adds the gray background color
                        minHeight: "100vh" // Ensure it covers the entire height of the viewport
                    }}
                >
                    <SentBloodTable/>
                </Box>
            </Grid>
        </Grid>
    );
};



export default  DashSentBloodTable;