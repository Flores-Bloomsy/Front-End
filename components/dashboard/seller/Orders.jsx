import { useEffect, useState } from "react";

import { getOrdersForSeller } from "@/utils/apiSeller";

import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import { formatDate } from "@/utils/formatDate";
import { DialogMailingAddress } from "../DialogMailingAddress";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const open = Boolean(anchorEl);

  console.log(orders);

  useEffect(() => {
    getOrdersForSeller()
      .then((response) => setOrders(response))
      .catch((error) => console.log(error));
  }, []);

  function handleMenuOpen(event, order) {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setSelectedOrder(null);
  }

  return (
    <Stack sx={{ width: { xs: "90%", sm: "80%" }, height: "100%" }} spacing={2}>
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
              {/* <TableCell>Estado del Envio</TableCell> */}
              <TableCell>Total</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                {/* <TableCell>{order.orderStatus}</TableCell> */}
                <TableCell>{`$ ${order.totalAmount}`}</TableCell>
                <TableCell align="center">
                  <Button onClick={(e) => handleMenuOpen(e, order)}>
                    Mas datos
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogMailingAddress
        open={open}
        onClose={handleMenuClose}
        order={selectedOrder}
      />
    </Stack>
  );
}
