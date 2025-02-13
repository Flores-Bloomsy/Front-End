import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

import { useRouter } from "next/router";

function ToggleLineButtons({ user, seller }) {
  const [activeSide, setActiveSide] = useState("left");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === user) {
      setActiveSide("left");
    } else if (router.pathname === seller) {
      setActiveSide("right");
    }
  }, [router.pathname]);

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
    } else {
      console.error("La ruta no está definida:", route);
    }
  };

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
        onClick={() => {
          setActiveSide("left");
          handleNavigation(user);
        }}
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
            backgroundColor: activeSide === "left" ? "#741C28" : "#F5F5F5",
            transition: "height 0.3s",
          },
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        disableRipple
      >
        Soy un usuario
      </Button>
      <Button
        onClick={() => {
          setActiveSide("right");

          handleNavigation(seller);
        }}
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
            backgroundColor: activeSide === "right" ? "#741C28" : "#F5F5F5",
            transition: "height 0.3s",
          },
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        disableRipple
      >
        Soy un negocio
      </Button>
    </Box>
  );
}

export default ToggleLineButtons;
