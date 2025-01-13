import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

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

export default function NavItemsBuyer({ onSelect, userId, rol }) {
  const [selected, setSelected] = useState(null);
  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  );

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
    <Box
      sx={{
        minWidth: { xs: "auto", md: "7.85rem" },
        width: { xs: "auto", md: "20%" },
      }}
    >
      <Stack spacing={1}>
        {buyerMenuItems.map((item, index) => (
          <Box key={item.text}>
            {isMobileOrTablet ? (
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
              // Usar Button en resoluciones de escritorio
              <Button
                startIcon={item.icon}
                onClick={() => handleClick(item.text)}
                variant="text"
                fullWidth
                sx={{
                  minWidth: "7.3rem",

                  justifyContent: "flex-start",
                  textTransform: "none",
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
                {item.text}
              </Button>
            )}
            {index === buyerMenuItems.length - 2 && (
              <Divider sx={{ my: 1, bgcolor: "primary.main" }} />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
