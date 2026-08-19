import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        primary: {
            main: "#0F4C81"
        },

        secondary: {
            main: "#00A3A3"
        },

        background: {

            default: "#F4F7FA",

            paper: "#FFFFFF"

        }

    },

    typography: {

        fontFamily: "Roboto",

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 600
        },

        button: {
            textTransform: "none",
            fontWeight: 600
        }

    },

    shape: {

        borderRadius: 10

    }

});

export default theme;