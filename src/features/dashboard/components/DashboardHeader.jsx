import { Box, Typography } from "@mui/material";

function DashboardHeader() {

    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                Dashboard
            </Typography>

            <Typography
                color="text.secondary"
            >
                Welcome back! Here's what's happening today.
            </Typography>

        </Box>

    );

}

export default DashboardHeader;