import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import Title from "@/components/cart/Title";
import {
  fetchCartItems,
  handleIncrement,
  handleDecrement,
  handleRemove,
} from "@/utils/apiCart";

import theme from "@/theme";
import Link from "next/link";
import Image from "next/image";
import QuantityButton from "@/components/cart/ButtonQuantity";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log("cart", cartItems);

  const checkCartEmpty = () => {
    if (cartItems.length === 0) {
      router.push("/empty"); // Redirige si el carrito está vacío
    }
  };

  useEffect(() => {
    fetchCartItems(setCartItems, setLoading);
  }, []);

  useEffect(() => {
    if (!loading) {
      checkCartEmpty();
    }
  }, [cartItems, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const token = localStorage.getItem("Token");

  const handleIncrementClick = (itemId) => {
    if (!itemId) {
      return;
    }
    handleIncrement(itemId, cartItems, setCartItems, token);
  };

  const handleDecrementClick = (itemId) => {
    if (!itemId) {
      return;
    }
    handleDecrement(itemId, cartItems, setCartItems, token);
  };
  const handleRemoveClick = async (id) => {
    await handleRemove(id, setCartItems); // Eliminar el producto
    checkCartEmpty(); // Verificar si el carrito está vacío después de la eliminación
  };

  // Calcular el total de productos y el total en dinero
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

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "10px",
        mt: "20px",
        px: "10px",
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
        <Title title={"Carrito"} />
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
                Agregar mas items
              </Box>
              <Link
                href="/bouquet"
                passHref
                sx={{ textDecoration: "none", mb: "1.5rem" }}
              >
                continua comprando
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
                    sx={{ fontFamily: theme.typography.fontFamily }}
                  >
                    {item.name}
                  </Box>
                  <Box
                    component="span"
                    sx={{ fontFamily: theme.typography.fontFamily }}
                  >
                    {`$${item.price}`}
                  </Box>

                  <Box>
                    <QuantityButton
                      quantity={item.quantity}
                      onIncrement={() =>
                        handleIncrementClick(item.bouquetFlowerId)
                      }
                      onDecrement={() =>
                        handleDecrementClick(item.bouquetFlowerId)
                      }
                    />
                  </Box>
                  <Button
                    type="submit"
                    onClick={() => handleRemoveClick(item.bouquetFlowerId)}
                    sx={{ justifyContent: "start" }}
                  >
                    remover
                  </Button>
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
                <Grid item xs={6}>
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
                    }}
                  >
                    <Box component="span">{totalQuantity} articulos</Box>
                    <Box component="span">${totalPrice.toFixed(2)}</Box>
                    <Box
                      component="span"
                      sx={{ fontFamily: "Lora, serif", fontSize: "1.25rem" }}
                    >
                      ${totalPrice.toFixed(2)}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Link href="/checkout/address">
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
                  Checkout
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CartPage;
