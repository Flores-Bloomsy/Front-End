import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#741C28",
    },
    secondary: {
      main: "#FFB8A7",
    },
    background: {
      default: "#FFF5EE",
    },
    text: {
      primary: "#002210",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",

    h1: {
      fontFamily: "Lora, serif",
    },
    h2: {
      fontFamily: "Lora, serif",
    },
    h3: {
      fontFamily: "Lora, serif",
    },
    h4: {
      fontFamily: "Lora, serif",
    },
    h5: {
      fontFamily: "Lora, serif",
    },
    h6: {
      fontFamily: "Lora, serif",
    },
  },
});

export default theme;
