import { useState } from "react";

import { Box, Button, Divider, Stack } from "@mui/material";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const sellerMenuItems = [
  {
    icon: <TocRoundedIcon />,
    text: "Ordenes",
  },
  {
    icon: <LocalOfferRoundedIcon />,
    text: "Productos",
  },
  {
    icon: <SettingsIcon />,
    text: "Mi Cuenta",
  },
  {
    icon: <LogoutIcon />,
    text: "Conectar paypal",
  },
  {
    icon: <LogoutIcon />,
    text: "Cerrar Sesión",
  },
];

export default function NavItemsSeller({ onSelect, userId, rol }) {
  const [selected, setSelected] = useState("Mi Cuenta");

  function handleClick(text) {
    if (text === "Cerrar Sesión") {
      localStorage.removeItem("Token");
      localStorage.removeItem(`user_${userId}_${rol}`);

      window.location.href = "/";
      return;
    }
    setSelected(text);
    onSelect(text);
  }

  return (
    <Stack
      component="aside"
      spacing={1}
      sx={{ minWidth: "7.85rem", width: "20%" }}
    >
      {sellerMenuItems.map((item, index) => (
        <Box key={item.text}>
          <Button
            startIcon={item.icon}
            onClick={() => handleClick(item.text)}
            variant="text"
            fullWidth
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              color: selected === item.text ? "primary.main" : "text.primary",
              bgcolor:
                selected === item.text
                  ? "rgba(116, 28, 40, 0.1)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  selected === item.text ? "primary.dark" : "secondary.main",
                color: selected === item.text ? "white" : "primary.main",
              },
            }}
          >
            {item.text}
          </Button>
          {index === sellerMenuItems.length - 2 && (
            <Divider sx={{ my: 1, bgcolor: "primary.main" }} />
          )}
        </Box>
      ))}
    </Stack>
  );
}
