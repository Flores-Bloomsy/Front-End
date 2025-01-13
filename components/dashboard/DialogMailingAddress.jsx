import { decodeToken } from "@/utils/decodeToken";
import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProductCard } from "./seller/ProductCard";

export function DialogMailingAddress({ open, onClose, order }) {
  const [token, setToken] = useState(null);

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
