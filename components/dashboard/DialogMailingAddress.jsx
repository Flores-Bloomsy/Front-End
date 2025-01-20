import { decodeToken } from "@/utils/decodeToken";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProductCard } from "./seller/ProductCard";
import PrintQR from "./PrintQR";

export function DialogMailingAddress({ open, onClose, order }) {
  const [token, setToken] = useState(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  console.log("orden", order?.qrCode);

  const mailingAddres = [
    { label: "Recibe", value: order?.shippingAddress?.name },
    { label: "Calle", value: order?.shippingAddress?.street },
    { label: "Número", value: order?.shippingAddress?.number },
    { label: "Ciudad", value: order?.shippingAddress?.city },
    {
      label: "Código Postal",
      value: order?.shippingAddress?.postalCode,
    },
  ];

  const productsFilter = order?.products.filter(
    (product) => product.sellerId === token.id
  );

  useEffect(() => {
    const localToken = localStorage.getItem("Token");
    const decodedLocalToken = decodeToken(localToken);
    setToken(decodedLocalToken);
  }, []);

  function handlePrintQR() {
    setShowQRDialog(true);
  }

  function handleCloseQRDialog() {
    setShowQRDialog(false);
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Informacion del Pedido</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Stack>
          <Typography variant="h4">Dirección de Envío</Typography>
          {mailingAddres.map((item, index) => (
            <Typography key={index} variant="h6">
              <Typography
                component="span"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                {item.label}:
              </Typography>{" "}
              {item.value}
            </Typography>
          ))}
          <Typography
            sx={{
              fontWeight: "bold",
              color: "error.main",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              padding: "8px",
              borderRadius: "4px",
              mb: 1,
            }}
          >
            ** No olvides imprimir el QR y adjuntarlo al paquete **
          </Typography>
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            onClick={handlePrintQR}
          >
            Ver e Imprimir QR
          </Button>
          {showQRDialog && (
            <PrintQR
              open={showQRDialog}
              onClose={handleCloseQRDialog}
              qrCode={order?.qrCode}
            />
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h4">Productos a Enviar</Typography>
          {productsFilter?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
