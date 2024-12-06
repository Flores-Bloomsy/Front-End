import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function UserDataFormCard({ role }) {
  return (
    <Container
      sx={{
        bgcolor: "#fff",
        borderRadius: "18px",
        boxShadow: 2,
        p: 2,
        maxWidth: { sm: "35rem", md: "100%" },
        display: "grid",
        placeItems: "center",
        gap: 2,
      }}
    >
      <Typography sx={{ width: "100%", textAlign: "left" }}>
        ¡Bienvenido a Blooms&bits!
      </Typography>

      {role === "seller" ? (
        <TextField label="Nombre de tu Floreria" variant="outlined" fullWidth />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
          }}
        >
          <TextField label="Nombres" variant="outlined" fullWidth />
          <TextField label="Apellidos" variant="outlined" fullWidth />
        </Box>
      )}
      <TextField
        label="Número de Celular"
        type="tel"
        variant="outlined"
        fullWidth
        placeholder="Ej. 123-456-7890"
        sx={{
          "& input[type='tel']": {
            appearance: "textfield",
          },
        }}
      />
      {role === "seller" && (
        <>
          <Typography sx={{ textAlign: "left", width: "100%" }}>
            Horarios
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              width: "100%",
            }}
          >
            <TextField
              type="time"
              label="Apertura"
              variant="outlined"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            <TextField
              type="time"
              label="Cierre"
              variant="outlined"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Box>
        </>
      )}
      <Typography sx={{ textAlign: "left", width: "100%" }}>
        Direccion
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        <TextField label="Calle" variant="outlined" fullWidth />
        <TextField label="Número de Casa" variant="outlined" fullWidth />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        <TextField label="Ciudad" variant="outlined" fullWidth />
        <TextField label="Estado" variant="outlined" fullWidth />
      </Box>
      <TextField
        label="Código Postal"
        variant="outlined"
        fullWidth
        type="number"
      />
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: " 25px 0 25px 0",
            padding: ".8rem 1.5rem",
            width: { xs: "100%", lg: "auto" },
          }}
        >
          Completar Configuración
        </Button>
      </Box>
    </Container>
  );
}
