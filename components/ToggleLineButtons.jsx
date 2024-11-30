import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const ToggleLineButtons = () => {
  const [activeSide, setActiveSide] = useState("left");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        borderBottom: "2px solid #F5F5F5",
      }}
    >
      <Button
        onClick={() => setActiveSide("left")}
        sx={{
          flex: 1,
          padding: "1rem",
          position: "relative",
          color: activeSide === "left" ? "#455A64" : "text.secondary",
          fontWeight: activeSide === "left" ? "bold" : "normal",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: "100%",
            height: activeSide === "left" ? "3px" : "2px",
            backgroundColor: activeSide === "left" ? "#FF7957" : "#F5F5F5",
            transition: "height 0.3s",
          },
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        disableRipple
      >
        Soy usuario
      </Button>
      <Button
        onClick={() => setActiveSide("right")}
        sx={{
          flex: 1,
          padding: "1rem",
          position: "relative",
          color: activeSide === "right" ? "#455A64" : "#78909C",
          fontWeight: activeSide === "right" ? "bold" : "normal",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: "100%",
            height: activeSide === "right" ? "3px" : "2px",
            backgroundColor: activeSide === "right" ? "#FF7957" : "#F5F5F5",
            transition: "height 0.3s",
          },
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        disableRipple
      >
        Soy negocio
      </Button>
    </Box>
  );
};

export default ToggleLineButtons;
