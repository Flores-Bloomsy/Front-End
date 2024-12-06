import { Box, Container, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function CardAddImg({ role }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    }
  };

  return (
    <Container
      sx={{
        bgcolor: "#fff",
        borderRadius: "18px",
        boxShadow: 2,
        p: 3,
        maxWidth: { sm: "35rem", md: "25rem" },
        maxHeight: { md: "25rem" },
        display: "grid",
        placeItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: "9rem",
          height: "9rem",
          borderRadius: "50%",
          bgcolor: "rgba(114, 114, 114, 0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          border: "2px solid #fff",
          "&:hover": { backgroundColor: "rgba(114, 114, 114, 0.9)" },
        }}
      >
        <input
          accept="image/*"
          id="profile-image-upload"
          type="file"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
          onChange={handleFileChange}
        />

        <PhotoCameraIcon sx={{ color: "#fff", fontSize: 30 }} />
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 14,
            color: "#fff",
          }}
        >
          Actualizar foto de perfil
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "grid", gap: 2 }}>
        <Box
          sx={{
            py: 1.5,
            px: 2,
            bgcolor: "#ECEFF1",
            borderRadius: "10px",
          }}
        >
          <Typography fontWeight="bold">Correo</Typography>
          <Typography sx={{ fontSize: ".8rem" }}>
            speed_flores24@hotmail.com
          </Typography>
        </Box>
        <Box
          sx={{
            py: 1,
            px: 1.5,
            bgcolor: "#ECEFF1",
            borderRadius: "100px",
          }}
        >
          <Typography
            alignContent="center"
            sx={{
              display: "flex",
              alignItems: "center",

              fontSize: ".8rem",
            }}
          >
            <WorkspacePremiumIcon /> Blooms And Bits{" "}
            {role === "seller" && "Negocio"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
