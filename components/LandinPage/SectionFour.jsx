import Link from "next/link";
import InfoCard from "./InfoCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function SectionFour({ navigationId }) {
  const occasions = [
    {
      text: "Cumpleaños",
      img: "/birday.webp",
      route: "Cumpleaños",
    },
    {
      text: "Aniversario",
      img: "/anniversary.webp",
      route: "Aniversarios",
    },
    {
      text: "Día de las madres",
      img: "/mothers-day.webp",
      route: "Día de las madres",
    },
    {
      text: "Nuevo bebé",
      img: "/beby.webp",
      route: "Nuevo Bebé",
    },
    {
      text: "Condolencias",
      img: "/condolences.webp",
      route: "Condolencias",
    },
    {
      text: "Todos los productos",
      img: "/all-products.webp",
      route: "",
    },
  ];

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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

      <Box sx={{ position: "relative", width: "100%" }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={isDesktop ? 4 : isTablet ? 2 : 1}
          navigation={{
            nextEl: `.${navigationId}-next`,
            prevEl: `.${navigationId}-prev`,
          }}
          loop={true}
          style={{ marginTop: "20px" }}
        >
          {occasions.map((occasion) => (
            <SwiperSlide key={occasion.text}>
              <Link
                href={`/bouquet?occasion=${occasion.route}`}
                style={{ textDecoration: "none" }}
                passHref
              >
                <InfoCard img={occasion.img} text={occasion.text} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          className={`${navigationId}-prev`}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            color: "primary.main",
            zIndex: 10,
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <IconButton
          className={`${navigationId}-next`}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            color: "primary.main",
            zIndex: 10,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

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
