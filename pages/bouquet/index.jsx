import { useEffect, useState } from "react";

import AsideFilter from "@/components/bouquets/AsideFilter";
import CardProduct from "@/components/bouquets/CardProduct";
import { getAllProduct } from "@/utils/apiProduct";
import { Grid2, Container, Divider, Button, Drawer, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function Bouquets({ bouquets }) {
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();
  const { query } = router;
  console.log(router.query);
  console.log(openFilter);

  const [filters, setFilters] = useState({
    rangoPrecio: { desde: "", hasta: "" },
    occasion: [],
    size: null,
    color: [],
    style: null,
    flowerType: [],
    personality: [],
  });
  console.log(filters);
  //actualiza los filtros cuando la url cambia
  useEffect(() => {
    const newFilters = { ...filters };
    if (query.occasion) newFilters.occasion = [query.occasion];

    if (query.flowerType) newFilters.flowerType = [query.flowerType];

    setFilters(newFilters);
  }, [query]);

  function toggleDrawer() {
    setOpenFilter(!openFilter);
  }

  function handleFilterChange(newFilters) {
    const cleanFilters = {
      ...filters,
      rangoPrecio: newFilters.rangoPrecio || { desde: "", hasta: "" },
      occasion: newFilters.ocacion ?? [],
      size: newFilters.Tamano ?? null,
      color: newFilters.color || [],
      style: newFilters.estilo ?? null,
      flowerType: newFilters.floresYTipos || [],
      personality: newFilters.personalida || [],
    };

    setFilters(cleanFilters);
  }

  const filteredBouquets = bouquets.filter((bouquet) => {
    const { desde, hasta } = filters.rangoPrecio || {};

    // Filtrar por rango de precio
    if (desde && bouquet.price < desde) return false;
    if (hasta && bouquet.price > hasta) return false;

    // Filtrar por cada uno de los campos de opciones
    for (const [key, values] of Object.entries(filters)) {
      if (!values || key === "rangoPrecio") continue; // Ignorar filtros vacíos o rango de precio

      // Extraer el campo correspondiente del objeto bouquet
      const bouquetValue = bouquet.details?.[key];

      // Si el valor en filters es un arreglo y tiene elementos
      if (Array.isArray(values) && values.length > 0) {
        if (Array.isArray(bouquetValue)) {
          // Si el valor del bouquet también es un arreglo, comprobar que todas las opciones coincidan
          const allMatch = values.every((value) =>
            bouquetValue.includes(value)
          );
          if (!allMatch) return false;
        } else {
          // Si el valor del bouquet no es un arreglo, verificar coincidencia directa
          if (!values.includes(bouquetValue)) return false;
        }
      }

      // Si el valor en filters es una cadena, comparar directamente
      if (typeof values === "string" && values) {
        if (bouquetValue !== values) return false;
      }
    }

    return true; // Solo pasa si cumple todas las condiciones
  });
  console.log(filteredBouquets);

  return (
    <Container
      maxWidth="100%"
      sx={{ bgcolor: "white", minHeight: "87vh", py: 4 }}
    >
      <Button
        onClick={toggleDrawer}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        Fitros
      </Button>

      <Container
        sx={{
          display: "flex",
          bgcolor: "white",
          gap: 3,
        }}
      >
        <Drawer
          sx={{
            display: { sm: "none" },
          }}
          PaperProps={{
            sx: {
              width: "50%",
              padding: "1rem",
            },
          }}
          open={openFilter}
          onClose={toggleDrawer}
        >
          <AsideFilter filters={filters} onFilterChange={handleFilterChange} />
        </Drawer>
        <Box
          sx={{
            minWidth: "25%",
            width: "25%",
            display: { xs: "none", sm: "block" },
          }}
        >
          <AsideFilter filters={filters} onFilterChange={handleFilterChange} />
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderColor: "#741C28", display: { xs: "none", sm: "flex" } }}
        />
        <Grid2
          container
          spacing={2}
          sx={{ marginTop: 2 }}
          justifyContent="center"
        >
          {filteredBouquets.length === 0 && (
            <h1>No hay resultados para tu búsqueda</h1>
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
  console.log(bouquets);
  return {
    props: {
      bouquets,
    },
    revalidate: 60,
  };
}
