import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import Title from "@/components/cart/Title";

import theme from "@/theme";
import Link from "next/link";
import Image from "next/image";

const productInCart = [
  "/Flower-shops-signup.jpg",
  "/inventory-in-flower-shop.jpg",
  "/negocio-flores-shop.avif",
];

function page() {
  const handleIncrement = () => console.log("Agregar producto");
  const handleDecrement = () => console.log("Quitar producto");
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "10px",
        px: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1000px",
        }}
      >
        <Title title={"Verificar orden"} />

        <Divider sx={{ margin: "5px 0 20px 0", bgcolor: "#741C28" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/**carrito */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                component="span"
                sx={{
                  fontSize: "1.25rem",
                  fontFamily: theme.typography.fontFamily,
                }}
              >
                Ajustar items
              </Box>
              <Link
                href="/cart"
                passHref
                sx={{ textDecoration: "none", mb: "1.5rem" }}
              >
                Editar carrito aqui
              </Link>
            </Box>
            {/**Items */}

            {productInCart.map((src, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  mb: "10px",
                  mt: "10px",
                }}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={150}
                  height={150}
                  style={{
                    mr: "1.25rem",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: "10px",
                    gap: "7px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontFamily: theme.typography.fontFamily }}
                  >
                    Titulo del producto
                  </Box>
                  <Box
                    component="span"
                    sx={{ fontFamily: theme.typography.fontFamily }}
                  >
                    precio del producuto
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: theme.typography.fontFamily,

                      fontSize: "1.25rem",
                    }}
                  >
                    SUbtotal: $2050
                  </Box>

                  <Box></Box>
                </Grid>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {/**resumen del checkout */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                p: "10px",
                boxShadow: 5,
              }}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  p: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  container="h4"
                  sx={{
                    fontFamily: "Lora, serif",
                    fontSize: "1.25rem",
                    mb: "1rem",
                  }}
                >
                  Direccion de entrega
                </Typography>
                <Box component="span">Fernando Herrera</Box>
                <Box component="span">Av. Siempre vivas</Box>
                <Box component="span">Col. Centro</Box>
                <Box component="span">Alcaldia de chipalsingo</Box>
                <Box component="span">Ciuda de Mexico</Box>
                <Box component="span">CP 1234567</Box>
                <Box component="span">123.123.123</Box>
                <Divider sx={{ margin: "20px 0" }} />
              </Box>
              <Typography
                container="h4"
                sx={{
                  fontFamily: "Lora, serif",
                  fontSize: "1.25rem",
                  mb: "1rem",
                }}
              >
                Resumen de orden
              </Typography>

              <Grid container item spacing={2}>
                <Grid item sx={6}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box component="span">No. Productos</Box>
                    <Box component="span">Subtotal</Box>
                    <Box
                      component="span"
                      sx={{ fontFamily: "Lora, serif", fontSize: "1.25rem" }}
                    >
                      Total:
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "end",
                      mb: "10px",
                    }}
                  >
                    <Box component="span">3 articulos</Box>
                    <Box component="span">$ 100</Box>
                    <Box
                      component="span"
                      sx={{ fontFamily: "Lora, serif", fontSize: "1.25rem" }}
                    >
                      $ 100
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Typography component="span" sx={{ fontSize: "0.80rem" }}>
                Al hacer clic en "Colocar orden" aceptas nuestras{" "}
                <a href="#" sx={{ textDecoration: "underline" }}>
                  {" "}
                  politicas de privacidad
                </a>{" "}
                y
                <a href="#" sx={{ textDecoration: "underline" }}>
                  {" "}
                  terminos y condiciones
                </a>
              </Typography>
              <Link href="/orders/123">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "1rem" }}
                  sx={{
                    width: "100%",
                    borderTopLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopRightRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                >
                  Colocar orden
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default page;
