import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#741C28",
    },
    secondary: {
      main: "#FFB8A7",
    },
    tertiary: {
      main: "#FF7957",
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
    fontWeight: 600,

    body1: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
    },
    h1: {
      fontFamily: "Lora, serif",
      fontSize: "2.25rem",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "Lora, serif",
      fontSize: "2rem",
      fontWeight: 600,
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
