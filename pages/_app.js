import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/index";
import { CssBaseline } from "@mui/material";
import MainLayout from "@/layouts/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}
