import { Box, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import BtnComprarCart from "../bouquets/BtnComprarCart";
import Link from "next/link";

export default function GallerySection({ bouquets }) {
  console.log("de aqui", bouquets);
  return (
    <Stack flex="50%" spacing={3}>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h2" fontSize={24}>
          Tu mejor opción
        </Typography>
        <Box
          bgcolor="#fff"
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: 1,
            bgcolor: "#fff",
            width: "400px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={bouquets[0].images[0]}
            alt={bouquets[0].name}
            width={400}
            height={300}
          />
          <Box
            sx={{
              p: 3,
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundImage:
                "linear-gradient(to top, rgba(116, 28, 40, 0.97) 40%, rgba(116, 28, 40, 0) 100%)",
            }}
          >
            <Box
              component={Link}
              href={`/bouquet/${bouquets[0]._id}`}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.02)",
                  transition: "all 0.1  s ease",
                },
              }}
            >
              <Typography sx={{ color: "#fff" }}>{bouquets[0].name}</Typography>
              <Typography
                sx={{ color: "#fff" }}
              >{`$ ${bouquets[0].price} MEX`}</Typography>
            </Box>
            <BtnComprarCart
              productId={bouquets[0]._id}
              name={bouquets[0].name}
              image={bouquets[0].images[0]}
              texto={"comprar"}
              sx={{
                bgcolor: "tertiary.main",
                borderRadius: " 20px 0 20px 0",
                height: "fit-content",
                "&:hover": {
                  bgcolor: "secondary.main",
                  cursor: "pointer",
                  transform: "scale(1.02)",
                  transition: "all 0.3s ease",
                },
              }}
            />
          </Box>
        </Box>
      </Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          {bouquets.length > 1 && (
            <Typography fontSize="24px" fontFamily="bold">
              Otras opciones
            </Typography>
          )}
        </Grid2>
        {bouquets.slice(1).map((bouquet) => (
          <Grid2
            key={bouquet.name}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: ".5rem",
            }}
            size={6}
          >
            <Image
              src={bouquet.images[0]}
              alt={bouquet.name}
              width={400}
              height={300}
              style={{
                objectFit: "fill", // Asegura que la imagen llene el contenedor sin deformarse
                borderRadius: ".5rem", // Borde redondeado para la imagen
              }}
            />
            <Box
              sx={{
                p: 3,
                alignItems: "flex-end",
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                backgroundImage:
                  "linear-gradient(to top, rgba(116, 28, 40, 0.97) 40%, rgba(116, 28, 40, 0) 100%)",
              }}
            >
              <Box
                component={Link}
                href={`/bouquet/${bouquet._id}`}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.02)",
                    transition: "all 0.1  s ease",
                  },
                }}
              >
                <Typography sx={{ color: "#fff" }}>{bouquet.name}</Typography>
                <Typography
                  sx={{ color: "#fff" }}
                >{`$ ${bouquet.price} MEX`}</Typography>
              </Box>
              <BtnComprarCart
                productId={bouquet._id}
                name={bouquet.name}
                image={bouquet.images[0]}
                texto={"comprar"}
                sx={{
                  bgcolor: "tertiary.main",
                  borderRadius: " 20px 0 20px 0",
                  height: "fit-content",
                  "&:hover": {
                    bgcolor: "secondary.main",
                    cursor: "pointer",
                    transform: "scale(1.02)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
