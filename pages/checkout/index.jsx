import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import Title from "@/components/cart/Title";
import { useShipping } from "@/context/shippingContext";

import theme from "@/theme";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { fetchCartItems, clearCartBackend } from "@/utils/apiCart";
import { useEffect, useState } from "react";
import { placeOrder } from "@/utils/apiPlaceOrder";
import { useRouter } from "next/router";

function OrderCheckout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { shippingInfo } = useShipping();
  const router = useRouter();

  useEffect(() => {
    fetchCartItems(setCartItems, setLoading);
  }, []);

  const getOrderSummary = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalQuantity += item.quantity; // Sumar la cantidad de productos
      totalPrice += item.price * item.quantity; // Sumar el total en dinero (precio * cantidad)
    });

    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = getOrderSummary();

  if (loading) {
    return <div>Loading...</div>;
  }

  //limpiar el carrito
  const clearCartItems = () => {
    setCartItems([]); // Limpia el estado de `cartItems`
    localStorage.removeItem("cart"); // Si también estás utilizando localStorage
  };

  const onPlaceOrder = async () => {
    setIsPlaceOrder(true);
    const resp = await placeOrder(shippingInfo, cartItems);

    if (!resp.ok) {
      setIsPlaceOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    const cartCleared = await clearCartBackend();
    if (!cartCleared) {
      console.error("Error al limpiar el carrito en el backend.");
      return;
    }

    clearCartItems();

    // Redirige usando el número de orden
    const orderNumber = resp.data.data._id;

    console.log("soy resp", orderNumber); // Verifica qué contiene `resp`
    if (orderNumber) {
      router.push(`/orders/${orderNumber}`);
    } else {
      console.error("No se encontró el número de orden en la respuesta.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "10px",
        mt: "20px",
        bgcolor: "white",
        borderRadius: "15px",
        pb: "30px",
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

            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  mb: "10px",
                  mt: "10px",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
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
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: "1.25rem",
                    }}
                  >
                    {item.name}
                  </Box>
                  <Box
                    component="span"
                    sx={{ fontFamily: theme.typography.fontFamily }}
                  >
                    cantidad del producto{" "}
                    <span style={{ fontSize: "1.10rem" }}>
                      {`(${item.quantity})`}
                    </span>
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                    }}
                  >
                    <span
                      style={{ fontSize: "1.05rem", fontWeight: "bold" }}
                    >{`$${item.price * item.quantity}`}</span>
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
                <Box component="span">
                  {shippingInfo.name} {shippingInfo.lastName}
                </Box>
                <Box component="span">{shippingInfo.street}</Box>
                <Box component="span">{shippingInfo.city}</Box>
                <Box component="span">{shippingInfo.state}</Box>
                <Box component="span">{shippingInfo.postalCode}</Box>
                <Box component="span">{`casa: #${shippingInfo.number}`}</Box>
                <Box component="span">{shippingInfo.phone}</Box>
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
                    <Box component="span">$subtotal</Box>
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
                    <Box component="span">{totalQuantity} articulos</Box>
                    <Box component="span">$ {totalPrice.toFixed(2)}</Box>
                    <Box
                      component="span"
                      sx={{ fontFamily: "Lora, serif", fontSize: "1.25rem" }}
                    >
                      {totalPrice.toFixed(2)}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Typography component="span" sx={{ fontSize: "0.80rem" }}>
                Al hacer clic en &quot;Colocar orden&quot; aceptas nuestras
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
              <Box>
                <Box component="span" sx={{ color: "red" }}>
                  {errorMessage}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={!isPlaceOrder ? onPlaceOrder : undefined} // Desactiva el click cuando está deshabilitado
                  disabled={isPlaceOrder} // Propiedad para cambiar estado
                  style={{ marginTop: "1rem" }}
                  sx={{
                    width: "100%",
                    borderTopLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopRightRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                >
                  {isPlaceOrder ? "Orden enviada" : "Colocar orden"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default OrderCheckout;
