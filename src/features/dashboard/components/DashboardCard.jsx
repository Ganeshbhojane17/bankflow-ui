import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

function DashboardCard({
    title,
    value,
    icon,
    color = "primary.main"
}) {

    return (

        <Card
            elevation={2}
            sx={{
                height: "100%",
                borderRadius: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8
                }
            }}
        >

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    {/* Left Section */}

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: 1 }}
                        >
                            {value}
                        </Typography>

                    </Box>

                    {/* Right Section */}

                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            backgroundColor: color,
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {icon}
                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}

export default DashboardCard;