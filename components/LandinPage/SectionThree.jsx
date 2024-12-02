import { Box, CardMedia, Container, Typography } from "@mui/material";
import Btn from "../Button";

export default function SectionThree() {
  const keyBenefits = [
    "Perfecto para su personalidad",
    "Sugerencias para cada ocasión",
    "Facilita la elección",
    "Ahorra tiempo",
  ];

  return (
    <Container
      align="center"
      sx={{
        justifyContent: { md: "space-between" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 4,
      }}
    >
      <CardMedia
        component="img"
        image="/flower-quest.webp"
        sx={{
          display: { xs: "none", md: "block" },
          width: "45%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: "100%",
          width: { xs: "100%", md: "55%", lg: "70" },
          maxWidth: { xs: "100%", md: "408px", lg: "500px" },
        }}
      >
        <Typography color="primary" sx={{ lineHeight: 1.3 }}>
          CON NUESTRO CUESTIONARIO PERSONALIZADO{" "}
        </Typography>
        <Typography variant="h2">
          Encuentra el ramo{" "}
          <span
            style={{ fontWeight: 600, fontStyle: "italic", color: "#FF7957" }}
          >
            perfecto
          </span>
        </Typography>
        <CardMedia
          component="img"
          image="/flower-quest.webp"
          sx={{
            display: { md: "none" },

            objectFit: "cover",
          }}
        />
        <Typography sx={{ textAlign: { md: "left" } }}>
          Nuestro cuestionario personalizado facilita encontrar el ramo ideal
          para cada ocasión. Con solo responder algunas preguntas sobre el
          evento, el estilo del destinatario y tu presupuesto, recibirás
          recomendaciones adaptadas para hacer que tu regalo sea único.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 3,
            marginX: "auto",
            flexWrap: "wrap",
          }}
        >
          {keyBenefits.map((benefit) => {
            return (
              <Box
                key={benefit}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "auto",
                }}
              >
                <Box
                  component="img"
                  src="/star.webp"
                  alt="star"
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <Typography
                  sx={{
                    textAlign: "left",
                    width: "130px",
                  }}
                >
                  {benefit}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Btn text="Empieza tú búsqueda" />
      </Box>
    </Container>
  );
}
