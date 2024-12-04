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
        <Typography
          sx={{ fontSize: { xs: "2rem", md: "2.25rem", lg: "3rem" } }}
          variant="h1"
        >
          Flores que
          <Typography
            variant="h1"
            component="span"
            color="tertiary"
            sx={{
              fontSize: { xs: "2rem", md: "2.25rem", lg: "3rem" },
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
            padding: ".8rem 1.5rem",
            display: { xs: "none", md: "block" },
            width: "auto",
            alignSelf: { xs: "center", md: "flex-start" },
          }}
        >
          Explora nuestras opciones
        </Button>
      </Box>
      <Box
        component="img"
        src="/img-main.webp"
        sx={{
          width: { xs: "80%", sm: "60%", md: "50%" },
          height: "auto",
          maxWidth: "600px",
        }}
      />
      <Button
        variant="contained"
        sx={{
          borderRadius: " 25px 0 25px 0",
          padding: ".8rem 1.5rem",
          display: { md: "none" },
        }}
      >
        Explora nuestras opciones
      </Button>
    </Container>
  );
}
