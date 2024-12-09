import { Box, Typography } from "@mui/material";

export default function ProfileHeader() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        gap: 1,
      }}
    >
      <Typography variant="h1" fontSize="1.5rem">
        Configura tu perfil en <br /> Bloom&Bits
      </Typography>
      <Typography sx={{ width: { sm: "35rem" } }}>
        Antes de buscar las flores que quieres obsequiar, es importante que
        configuremos tu perfil de usuario.
      </Typography>
    </Box>
  );
}
