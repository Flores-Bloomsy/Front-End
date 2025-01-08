import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function QuantityButton({ onIncrement, onDecrement, quantity }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "120px",
        borderRadius: "25px",
        overflow: "hidden",
      }}
    >
      {/* Botón de menos */}
      <IconButton
        size="small"
        onClick={onDecrement}
        sx={{ backgroundColor: "#741C28", borderRadius: "50%" }}
      >
        <RemoveIcon sx={{ color: "white", "&:hover": { color: "#741C28" } }} />
      </IconButton>
      {/* Número en el medio */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          flex: 1,
          textAlign: "center",
        }}
      >
        {quantity}
      </Typography>
      {/* Botón de más */}
      <IconButton
        size="small"
        onClick={onIncrement}
        sx={{ backgroundColor: "#741C28", borderRadius: "50%" }}
      >
        <AddIcon sx={{ color: "white", "&:hover": { color: "#741C28" } }} />
      </IconButton>
    </Box>
  );
}

export default QuantityButton;
