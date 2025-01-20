import { Container, Box } from "@mui/material";

export default function CustomMessagePage() {
  const htmlContent =
    '></p><p>nonononnonononon</p><p><br></p><p><img src="https://bloomshy.s3.amazonaws.com/uploads/BloomAndBits/descarga-3-.webp"></p>';
  return (
    <Container
      maxWidth
      sx={{
        position: "relative",
        height: "calc(100vh - 120px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto", // Permite el scroll del contenido
      }}
    >
      <Box
        sx={{
          position: "fixed", // El fondo se mantendrá fijo
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/bgCustomMessage.webp)",
          backgroundSize: "100px 100px",
          backgroundPosition: "20% 75%",
          opacity: 0.1,
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          zIndex: 1,
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Container>
  );
}
