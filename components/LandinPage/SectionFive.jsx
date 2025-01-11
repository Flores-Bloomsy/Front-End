import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import InfoCard from "./InfoCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function SectionFive({ navigationId }) {
  const flowers = [
    {
      text: "Rosa",
      img: "/rosa.webp",
      route: "Rosas",
    },
    {
      text: "Dalia",
      img: "/dalia.webp",
      route: "Dalias",
    },
    {
      text: "Crisantemo",
      img: "/crisantemo.webp",
      route: "Crisantemos",
    },
  ];

  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Container align="center">
      <Typography component="p" color="primary" sx={{ lineHeight: 1.3 }}>
        CONOCE MÁS SOBRE LAS
      </Typography>
      <Typography
        component="p"
        variant="h2"
        sx={{ fontWeight: 600, fontStyle: "italic", color: "#FF5733" }}
      >
        Flores de{" "}
        <span
          style={{ fontWeight: 600, fontStyle: "italic", color: "#FF5733" }}
        >
          temporada
        </span>
      </Typography>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={isDesktop ? 3 : isTablet ? 2 : 1} // Ajuste dinámico
          navigation={{
            nextEl: `.${navigationId}-next`,
            prevEl: `.${navigationId}-prev`,
          }}
          loop={true}
          style={{ marginTop: "20px" }}
        >
          {flowers.map((flower) => (
            <SwiperSlide key={flower.text}>
              <Link
                href={`/bouquet?flowerType=${flower.route}`}
                style={{ textDecoration: "none" }}
                passHref
              >
                <InfoCard img={flower.img} text={flower.text} />
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
        href="/flowers"
        variant="contained"
        sx={{
          borderRadius: " 25px 0 25px 0",
          padding: ".8rem 1.5rem",
          display: { lg: "none" },
        }}
      >
        Todas las flores
      </Button>
    </Container>
  );
}
