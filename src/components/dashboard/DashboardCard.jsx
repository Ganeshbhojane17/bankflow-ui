import { Card, CardContent, Typography, Box } from "@mui/material";

function DashboardCard({
    title,
    value,
    icon,
    color = "primary.main"
}) {

    return (

        <Card
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >

            <CardContent>

                <Box

                    display="flex"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Box>

                        <Typography
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            {value}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            color
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