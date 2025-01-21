import { useEffect, useState } from "react";

import CardProduct from "@/components/bouquets/CardProduct";
import { getAllProduct, searchBouquetsByKeyword } from "@/utils/apiProduct";
import { Grid2, Container, Divider } from "@mui/material";

import Title from "@/components/cart/Title";
import { useSearch } from "@/context/SearchContext";

export default function CardFilter({ bouquets }) {
  const [filteredBouquets, setFilteredBouquets] = useState(bouquets);

  const { searchQueryContext, setSearchQueryContext } = useSearch();
  //console.log({ searchQueryContext });

  // Realizar la lógica de filtrado dinámico
  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        // Si no hay búsqueda (input vacío), mostramos todos los productos
        if (searchQueryContext === "") {
          setFilteredBouquets(bouquets); // Resetear a todos los bouquets
        } else {
          // Realizamos la búsqueda con la palabra clave
          const result = await searchBouquetsByKeyword(searchQueryContext);
          setFilteredBouquets(result);
        }
      } catch (error) {
        console.error("Error al obtener bouquets:", error);
      }
    };

    fetchBouquets();
  }, [searchQueryContext, bouquets]);

  return (
    <Container sx={{ bgcolor: "white", minHeight: "87vh", py: 4 }}>
      <Title
        sx={{ ml: { md: "60px", sx: "30px" } }}
        title={
          <>
            {"Buscar Por: "}
            <span style={{ fontSize: "0.8em", fontWeight: "normal" }}>
              {searchQueryContext}
            </span>
          </>
        }
      />

      <Container
        sx={{
          display: "flex",
          alignItems: "end",
          bgcolor: "white",
          gap: 3,
          width: { sx: 0, md: "900px" },
        }}
      >
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            borderColor: "#741C28",
            display: { xs: "none", sm: "flex" },
            display: "flex",
            alignItems: "end",
          }}
        />
        <Grid2
          container
          spacing={2}
          sx={{ marginTop: 2 }}
          justifyContent="center"
        >
          {filteredBouquets.length === 0 && (
            <h1>No hay resultados para tu búsqueda: {searchQueryContext}</h1>
          )}

          {filteredBouquets.map((bouquet) => {
            return <CardProduct key={bouquet._id} props={bouquet} />;
          })}
        </Grid2>
      </Container>
    </Container>
  );
}

export async function getStaticProps() {
  const bouquets = await getAllProduct();
  // console.log(bouquets);
  return {
    props: {
      bouquets,
    },
    revalidate: 60,
  };
}
