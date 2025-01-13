import GallerySection from "@/components/recommendation/GallerySection";
import RecommendationForm from "@/components/recommendation/RecommendationForm";
import { Container, useTheme } from "@mui/material";
import { useState } from "react";

export default function Recommendation() {
  const [bouquetsFiltered, setBouquetFiltered] = useState(null);
  const theme = useTheme();

  function handleBouquetFiltered(filteredBouquet) {
    setBouquetFiltered(filteredBouquet);
  }

  return (
    <Container
      sx={{
        my: 5,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        [theme.breakpoints.up(800)]: {
          flexDirection: "row",
        },
        gap: 2,
      }}
    >
      <RecommendationForm onBouquetsFiltered={handleBouquetFiltered} />
      {bouquetsFiltered && <GallerySection bouquets={bouquetsFiltered} />}
    </Container>
  );
}
