import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import Title from "@/components/cart/Title";
import PaypalButton from "@/components/paypal/PaypalButton";
import OrderStatus from "@/components/paypal/orderStatus";

import { useRouter } from "next/router";

import theme from "@/theme";

import Image from "next/image";

import { getLatestOrder } from "@/utils/apiPlaceOrder";
import { useEffect, useState } from "react";

function PayOrder() {
  const router = useRouter();
  const { id } = router.query;

  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getLatestOrder(id);

      setLatestOrder(order);
    };

    fetchOrder();
  }, [id]);

  if (!latestOrder) {
    return <p>Cargando la última orden...</p>;
  }

  // console.log("ultima orden", latestOrder);

  const getOrderSummary = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    latestOrder.products.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = getOrderSummary();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "10px",
        px: "10px",
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
        <Title title={`Orden # ${id}`} />

        <Divider sx={{ margin: "5px 0 20px 0", bgcolor: "#741C28" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/**carrito */}
            <OrderStatus paymentStatus={latestOrder.paymentStatus ?? false} />
            {/**Items */}

            {latestOrder.products.map((item, index) => (
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
                    >{`$${item.totalPrice}`}</span>
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

                <Box component="span">{latestOrder.shippingAddress.city}</Box>
                <Box component="span">
                  {latestOrder.shippingAddress.country}
                </Box>
                <Box component="span">{`casa; #${latestOrder.shippingAddress.number}`}</Box>
                <Box component="span">
                  {latestOrder.shippingAddress.postalCode}
                </Box>
                <Box component="span">{latestOrder.shippingAddress.street}</Box>

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
                      mb: "10px",
                    }}
                  >
                    <Box component="span">{totalQuantity} articulos</Box>
                    <Box component="span">$ {totalPrice.toFixed(2)}</Box>
                    <Box
                      component="span"
                      sx={{ fontFamily: "Lora, serif", fontSize: "1.25rem" }}
                    >
                      {`$${totalPrice.toFixed(2)}`}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              {latestOrder.paymentStatus === "COMPLETED" ? (
                <OrderStatus
                  paymentStatus={latestOrder.paymentStatus ?? false}
                />
              ) : (
                <PaypalButton
                  customerId={latestOrder.customerId}
                  products={latestOrder.products}
                  orderNumber={latestOrder.orderNumber}
                  orderId={id}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PayOrder;
