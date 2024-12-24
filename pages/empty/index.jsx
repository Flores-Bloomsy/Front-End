import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

function page() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "800px",
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: "80px", mx: "20px" }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ fontWeight: "600px" }}>
            Tu carrito esta vacio
          </Typography>
          <Link href="/">
            {" "}
            <Typography
              component="span"
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "blue",
                fontWeight: "600px",
                fontSize: "1.25rem",
              }}
            >
              Regresar y comprar
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default page;
