import { useEffect, useState } from "react";
import Link from "next/link";

import { getOrdersByUser } from "@/utils/api";
import { formatDate } from "@/utils/formatDate";

import {
  Box,
  Collapse,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  function handleClick(orderId) {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  }

  console.log(orders);

  useEffect(() => {
    getOrdersByUser()
      .then((response) => setOrders(response))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Stack sx={{ width: "100%", height: "100%" }} spacing={2}>
      <Typography sx={{ display: "flex", gap: 1, fontWeight: "bolder" }}>
        <CardGiftcardIcon color="primary" />
        Historial de Compras
      </Typography>
      <TableContainer
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow: 2,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell># Orden</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              return (
                <>
                  <TableRow
                    key={order._id}
                    onClick={() => handleClick(order._id)}
                  >
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{`$ ${order.totalAmount}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 0 }} colSpan={4}>
                      <Collapse
                        in={openOrderId === order._id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Table
                          sx={{ backgroundColor: "#f5f5f0", boxShadow: 1 }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Producto</TableCell>
                              <TableCell>Estado</TableCell>
                              <TableCell>Piezas</TableCell>
                              <TableCell>Precio</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.products.map((product) => (
                              <TableRow
                                component={Link}
                                href={`/bouquet/${product?.productId}`}
                                key={product.productId}
                                sx={{ textDecoration: "none" }}
                              >
                                <TableCell sx={{ display: "flex" }}>
                                  <Box
                                    component="img"
                                    src={product.image}
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      marginRight: 2,
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography sx={{ fontWeight: 300 }}>
                                    {product.name}
                                  </Typography>
                                </TableCell>

                                <TableCell>{product.shippingStatus}</TableCell>
                                <TableCell>{`${product.quantity} Pzs`}</TableCell>
                                <TableCell>{`$ ${product.price}`}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
