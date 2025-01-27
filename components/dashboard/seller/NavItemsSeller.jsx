import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
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
    text: "Cerrar Sesión",
  },
];

export default function NavItemsSeller({ onSelect, userId, rol }) {
  const [selected, setSelected] = useState("Mi Cuenta");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
      sx={{
        minWidth: { xs: "auto", md: "7.85rem" },
        width: { xs: "auto", md: "20%" },
      }}
    >
      {sellerMenuItems.map((item, index) => (
        <Box key={item.text}>
          {/* Render IconButton on mobile and Button on larger screens */}
          {isMobile ? (
            <Tooltip title={item.text} arrow>
              <IconButton
                onClick={() => handleClick(item.text)}
                sx={{
                  height: 25, // Ajusta la altura si es necesario
                  width: 25, // Ajusta el ancho si es necesario
                  borderRadius: 1,
                  color:
                    selected === item.text ? "primary.main" : "text.primary",
                  bgcolor:
                    selected === item.text
                      ? "rgba(116, 28, 40, 0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selected === item.text
                        ? "primary.dark"
                        : "secondary.main",
                    color: selected === item.text ? "white" : "primary.main",
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              startIcon={item.icon}
              onClick={() => handleClick(item.text)}
              variant="text"
              fullWidth
              sx={{
                minWidth: "6.6rem",
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
          )}
          {index === sellerMenuItems.length - 2 && (
            <Divider sx={{ my: 1, bgcolor: "primary.main" }} />
          )}
        </Box>
      ))}
    </Stack>
  );
}
