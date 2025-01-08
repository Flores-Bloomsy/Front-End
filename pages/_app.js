import { ThemeProvider } from "@mui/material/styles";
import { ShippingProvider } from "@/context/shippingContext";
import { PayPalProvider } from "@/providers/providers";
import theme from "../theme/index";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import MainLayout from "@/layouts/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <ShippingProvider>
          <PayPalProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </PayPalProvider>
        </ShippingProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
