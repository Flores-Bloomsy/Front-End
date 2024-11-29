// pages/index.js
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h1">Bienvenido a mi sitio web</Typography>
      <Typography variant="body1">
        Esto es un texto con la fuente Nunito.
      </Typography>
      <Button variant="contained" color="primary">
        Botón con el color primario
      </Button>
    </div>
  );
}
