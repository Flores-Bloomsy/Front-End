import { useState } from "react";

import { Box, Button, Divider, Stack } from "@mui/material";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

const buyerMenuItems = [
  {
    icon: <CardGiftcardIcon />,
    text: "Mis Pedidos",
  },
  // {
  //   icon: <BookmarksOutlinedIcon />,
  //   text: "Favoritos",
  // },
  // {
  //   icon: <SendIcon />,
  //   text: "Segimiento",
  // },
  {
    icon: <SettingsIcon />,
    text: "Mi Cuenta",
  },
  {
    icon: <LogoutIcon />,
    text: "Cerrar Sesión",
  },
];

export default function NavItemsBuyer({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  function handleClick(text) {
    if (text === "Cerrar Sesión") {
      localStorage.removeItem("Token");

      router.push("/");

      return;
    }
    setSelected(text);
    onSelect(text);
  }
  console.log(selected);

  return (
    <Box sx={{ minWidth: "7.85rem", width: "20%" }}>
      <Stack spacing={1}>
        {buyerMenuItems.map((item, index) => (
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
                    selected === item.text
                      ? "primary.dark" // Hover para el botón activo
                      : "secondary.main", // Hover para botones inactivos
                  color: selected === item.text ? "white" : "primary.main",
                },
              }}
            >
              {item.text}
            </Button>
            {index === buyerMenuItems.length - 2 && (
              <Divider sx={{ my: 1, bgcolor: "primary.main" }} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
