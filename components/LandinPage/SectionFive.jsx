import { Container, Grid2, Typography, useMediaQuery } from "@mui/material";
import InfoCard from "./InfoCard";

export default function SectionFive() {
  const flowers = [
    {
      text: "Rosa",
      img: "/rosa.webp",
    },
    {
      text: "Dalia",
      img: "/dalia.webp",
    },
    {
      text: "Crisantemo",
      img: "/crisantemo.webp",
    },
  ];

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let visibleItems = 1;
  if (isTablet) visibleItems = 2;
  if (isDesktop) visibleItems = 3;

  return (
    <Container align="center" sx={{ display: "grid", gap: 2 }}>
      <Typography component="p" color="primary" sx={{ lineHeight: 1.3 }}>
        CONOCE MÁS SOBRE LAS
      </Typography>
      <Typography component="p" variant="h2">
        Flores de{" "}
        <span
          style={{ fontWeight: 600, fontStyle: "italic", color: "#FF5733" }}
        >
          temporada
        </span>
      </Typography>
      <Grid2
        container
        spacing={2}
        sx={{ marginTop: 2 }}
        justifyContent="center"
      >
        {flowers.slice(0, visibleItems).map((flower) => (
          <InfoCard img={flower.img} text={flower.text} key={flower.text} />
        ))}
      </Grid2>
    </Container>
  );
}
