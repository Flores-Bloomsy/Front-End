import Title from "@/components/cart/Title";
import Link from "next/link";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { getOrdersByUserId } from "@/utils/apiPlaceOrder";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function OrderRegister() {
  const [orders, setOrders] = useState([]); // Estado para almacenar las órdenes
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para manejar los errores

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { ok, data = [] } = await getOrdersByUserId(); // Esperamos la respuesta de la API
        if (ok) {
          setOrders(data);
        } else {
          throw new Error("No se pudo obtener las órdenes.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container
      sx={{
        alignItems: "center",
        mb: "10px",
        px: "10px",
        mt: "20px",
        bgcolor: "white",
        borderRadius: "15px",
        pb: "30px",
        pt: "30px",
      }}
    >
      <Title title="Ordenes" />
      <Divider sx={{ margin: "5px 0 20px 0", bgcolor: "#741C28" }} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }}>
          <TableHead
            sx={{
              backgroundColor: "#f1f1f1",
              borderBottom: "1px solid #ccc",
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1a1a1a",
                  padding: "16px 24px",
                  textAlign: "center",
                }}
              >
                #ID
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1a1a1a",
                  padding: "16px 24px",
                  textAlign: "left",
                }}
              >
                Nombre completo
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1a1a1a",
                  padding: "16px 24px",
                  textAlign: "left",
                }}
              >
                Estado
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1a1a1a",
                  padding: "16px 24px",
                  textAlign: "left",
                }}
              >
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.data.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell
                  sx={{
                    fontSize: "0.875rem",
                    padding: "16px",
                    fontWeight: "500",
                    color: "#1f2937",
                    textAlign: "center",
                  }}
                >
                  {order.orderNumber}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.875rem",
                    padding: "16px",
                    color: "#1f2937",
                  }}
                >
                  {order.shippingAddress.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.875rem",
                    padding: "16px",
                    color: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {order.paymentStatus === "COMPLETED" ? (
                    <>
                      <WalletOutlinedIcon sx={{ color: "#388e3c" }} />
                      <span style={{ marginLeft: "8px", color: "#388e3c" }}>
                        Pagada
                      </span>
                    </>
                  ) : order.paymentStatus === "PENDING" ? (
                    <>
                      <WalletOutlinedIcon sx={{ color: "#d32f2f" }} />
                      <span style={{ marginLeft: "8px", color: "#d32f2f" }}>
                        No Pagada
                      </span>
                    </>
                  ) : null}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.875rem",
                    padding: "16px",
                    color: "#1f2937",
                  }}
                >
                  <Link
                    href={`/orders/${order._id}`}
                    style={{ textDecoration: "underline" }}
                  >
                    Ver orden
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
