import { Box, Toolbar } from "@mui/material";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

const drawerWidth = 250;

function MainLayout({ children }) {

    return (

        <Box sx={{ display: "flex" }}>

            <Header />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: `calc(100% - ${drawerWidth}px)`,
                    minHeight: "100vh",
                    bgcolor: "#F4F7FA",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Toolbar />

                <Box
                    sx={{
                        flexGrow: 1,
                        p: 4
                    }}
                >
                    {children}
                </Box>

                <Footer />

            </Box>

        </Box>

    );

}

export default MainLayout;