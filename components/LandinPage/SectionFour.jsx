import {
  Button,
  Container,
  Grid2,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InfoCard from "./InfoCard";
import Link from "next/link";

export default function SectionFo() {
  const occasions = [
    {
      text: "Cumpleaños",
      img: "/birday.webp",
    },
    {
      text: "Aniversario",
      img: "/anniversary.webp",
    },
    {
      text: "Día de las madres",
      img: "/mothers-day.webp",
    },
    {
      text: "Nuevo bebé",
      img: "/beby.webp",
    },
    {
      text: "Condolencias",
      img: "/condolences.webp",
    },
    {
      text: "Todos los productos",
      img: "/all-products.webp",
    },
  ];

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let visibleItems = 1;
  if (isTablet) visibleItems = 4;
  if (isDesktop) visibleItems = 6;

  return (
    <Container align="center">
      <Typography color="primary" sx={{ lineHeight: 1.3 }}>
        EL ARREGLO INDICADO PARA CADA MOMENTO ESPECIAL
      </Typography>
      <Typography
        variant="h2"
        color="tertiary"
        sx={{ fontWeight: 600, fontStyle: "italic" }}
      >
        Ocaciones
      </Typography>

      <Grid2
        container
        spacing={2}
        sx={{ marginTop: 2 }}
        justifyContent="center"
      >
        {occasions.slice(0, visibleItems).map((ocacion) => (
          <InfoCard key={ocacion.text} img={ocacion.img} text={ocacion.text} />
        ))}
      </Grid2>
      <Button
        component={Link}
        href="/bouquet"
        variant="contained"
        sx={{
          borderRadius: " 25px 0 25px 0",
          padding: ".8rem 1.5rem",
          display: { lg: "none" },
        }}
      >
        Todos los productos
      </Button>
    </Container>
  );
}
