import { useEffect, useState } from "react";

import { getOrdersForSeller } from "@/utils/apiSeller";

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import TocRoundedIcon from "@mui/icons-material/TocRounded";
import { formatDate } from "@/utils/formatDate";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  console.log(orders);

  useEffect(() => {
    getOrdersForSeller()
      .then((response) => setOrders(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Stack sx={{ width: "100%", height: "100%" }} spacing={2}>
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TocRoundedIcon color="primary" sx={{ fontSize: "2rem" }} />
        Ordenes
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
              <TableCell>Fecha</TableCell>
              <TableCell>Comprador</TableCell>
              <TableCell>Estado del Pago</TableCell>
              <TableCell>Estado del Envio</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{`$ ${order.totalAmount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
