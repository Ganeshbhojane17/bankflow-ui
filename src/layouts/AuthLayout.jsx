import { Box, Paper } from "@mui/material";

function AuthLayout({ children }) {

    return (

        <Box

            sx={{

                display: "flex",

                minHeight: "100vh",

                backgroundColor: "#F4F7FA"

            }}

        >

            <Box

                sx={{

                    flex: 1,

                    display: {

                        xs: "none",

                        md: "flex"

                    },

                    alignItems: "center",

                    justifyContent: "center",

                    backgroundColor: "primary.main",

                    color: "white",

                    p: 6

                }}

            >

                <Box>

                    <h1>BankFlow CRM</h1>

                    <h3>Enterprise Banking Platform</h3>

                </Box>

            </Box>

            <Box

                sx={{

                    flex: 1,

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center"

                }}

            >

                <Paper

                    elevation={4}

                    sx={{

                        width: 450,

                        p: 5

                    }}

                >

                    {children}

                </Paper>

            </Box>

        </Box>

    );

}

export default AuthLayout;