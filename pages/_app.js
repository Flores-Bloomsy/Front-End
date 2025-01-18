import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import { SearchProvider } from "@/context/SearchContext";
import { ShippingProvider } from "@/context/shippingContext";
import { PayPalProvider } from "@/providers/providers";

import theme from "../theme/index";
import MainLayout from "@/layouts/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <ShippingProvider>
          <SearchProvider>
            <PayPalProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </PayPalProvider>
          </SearchProvider>
        </ShippingProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
