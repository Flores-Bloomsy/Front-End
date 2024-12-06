import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/index";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import MainLayout from "@/layouts/MainLayout";
import { UserProvider } from "../components/context/UserState";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
