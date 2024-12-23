import { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Divider, OutlinedInput, Typography } from "@mui/material";

import { opciones } from "@/utils/arrayCheckbox";
console.log(Object.entries(opciones));

const icon = (
  <CheckBoxOutlineBlankIcon fontSize="small" sx={{ color: "#FF7957" }} />
);
const checkedIcon = <CheckBoxIcon fontSize="small" sx={{ color: "#FF7957" }} />;

const noMultipleKeys = ["Tamano", "ocacion", "estilo"];

export default function AsideFilter({ filters, onFilterChange }) {
  const handlePriceChange = (field, value) => {
    const newPrice = { ...filters.rangoPrecio, [field]: value };
    onFilterChange({ ...filters, rangoPrecio: newPrice });
  };

  const handleOptionChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Box
      sx={{
        minWidth: "25%",
        width: "25%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box>
        <Typography>Rango de precio</Typography>
        <Box sx={{ display: "flex" }}>
          <OutlinedInput
            value={filters.rangoPrecio.desde}
            onChange={(e) => handlePriceChange("desde", e.target.value)}
            color="secondary"
            placeholder="Desde"
            sx={{
              height: "2.5rem",
              flex: 1,
            }}
            inputProps={{
              type: "number",
            }}
          />
          <Divider
            orientation="horizontal"
            variant="middle"
            flexItem
            sx={{ borderColor: "#741C28", width: ".5rem", height: "1.2rem" }}
          />
          <OutlinedInput
            value={filters.rangoPrecio.hasta}
            onChange={(e) => handlePriceChange("hasta", e.target.value)}
            color="secondary"
            placeholder="Hasta"
            sx={{
              height: "2.5rem",
              flex: 1,
            }}
            inputProps={{
              type: "number",
            }}
          />
        </Box>
      </Box>
      {Object.entries(opciones).map(([key, values]) => (
        <Autocomplete
          value={filters[key]}
          onChange={(e, value) => handleOptionChange(key, value)}
          key={key}
          multiple={!noMultipleKeys.includes(key)} //en el array de noMultipleKeys solo permite seleccionar 1 opcion
          id={`autocomplete-${key}`}
          options={values} // Usar las opciones del objeto
          disableCloseOnSelect
          getOptionLabel={(option) => option} // El nombre de la opción
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              {...params}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              sx={{ borderColor: "#741C28 " }}
            />
          )}
          slotProps={{
            chip: {
              sx: {
                backgroundColor: "#741C28", // Fondo del chip
                color: "#FFFFFF", // Texto del chip
                "& .MuiChip-deleteIcon": {
                  color: "#FFFFFF", // Color del ícono de eliminar
                  "&:hover": {
                    color: "#FF7957",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                  },
                },
                "&:hover": {
                  backgroundColor: "#9A283E", // Fondo al pasar el mouse
                },
              },
            },
          }}
        />
      ))}
    </Box>
  );
}
