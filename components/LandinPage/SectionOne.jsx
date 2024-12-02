import { Box, Button, Container, Typography } from "@mui/material";

export default function SectionOne() {
  return (
    <Container
      sx={{
        textAlign: { xs: "center", md: "left" },
        display: "flex",
        gap: "2rem",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "100%", sm: "auto", md: "auto  " },
          display: "flex",
          flexDirection: { xs: "column" },
          gap: { xs: 3, md: 8 },
        }}
      >
        <Typography sx={{ fontSize: "48px" }} variant="h1">
          Flores que
          <Typography
            variant="h1"
            component="span"
            color="tertiary"
            sx={{
              fontSize: "48px",
              lineHeight: 2,
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            {" "}
            cuentan{" "}
          </Typography>{" "}
          <br />
          historias
        </Typography>
        <Typography>
          Cada ramo que enviamos lleva consigo un mensaje especial, pensado para
          expresar lo que las palabras no alcanzan a decir. Descubre la magia de
          regalar más que flores: regala experiencias y emociones únicas para
          cada ocasión.
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: " 25px 0 25px 0",
            p: 1.5,
            display: { xs: "none", md: "block" },
            width: "auto",
            flexShrink: 0, // Evita que se reduzca
            flexGrow: 0,
          }}
        >
          Explora nuestras opciones
        </Button>
      </Box>
      <Box
        component="img"
        src="/img-main.webp"
        sx={{
          flexBasis: { xs: "100%", sm: "30%", md: "50%" },
          width: "50%",
          height: "auto",
          maxWidth: "600px",
        }}
      />
      <Button
        variant="contained"
        sx={{ borderRadius: " 25px 0 25px 0", p: 1.5, display: { md: "none" } }}
      >
        Explora nuestras opciones
      </Button>
    </Container>
  );
}
