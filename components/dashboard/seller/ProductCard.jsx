import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export function ProductCard({ product }) {
  return (
    <Card sx={{ overflow: "visible" }}>
      <CardMedia
        component="img"
        height="100"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ramos: {product.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}
