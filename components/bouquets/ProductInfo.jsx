import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ProductInfo({ props }) {
  const detailsBouquet = Object.entries(props.details);

  const propertyTranslations = {
    occasion: "Ocasión",
    size: "Tamaño",
    color: "Color",
    style: "Estilo",
    flowerType: "Tipo de flor",
    personality: "Personalidad",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: { xs: "auto", md: "12rem" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          alt="miflorirea manuel"
          sx={{ bgcolor: "tertiary.main", width: 32, height: 32 }}
        ></Avatar>
        <Typography>{props.ownerId.storeName}</Typography>
      </Box>
      <Typography variant="h1" sx={{ fontSize: "1.75rem" }}>
        {props.name}
      </Typography>
      <Typography>{props.description}</Typography>
      <Accordion>
        <AccordionSummary
          sx={{ bgcolor: "secondary.main" }}
          expandIcon={<ArrowDropDownIcon color="primary" />}
          aria-controls="detalles del ramo"
        >
          <Typography sx={{ fontWeight: "bold" }}>Detalles</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {detailsBouquet.map(([key, values]) => (
            <Box key={key}>
              <Typography key={key} sx={{ fontWeight: "bold" }}>
                {propertyTranslations[key] || key}
              </Typography>
              <Typography sx={{ fontWeight: "lighter" }}>
                {Array.isArray(values)
                  ? values.map((item, index) => (
                      <span key={index}>
                        {item}
                        <br />
                      </span>
                    ))
                  : values}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
