import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/index";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
