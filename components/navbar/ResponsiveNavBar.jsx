import {
  AppBar,
  TextField,
  Toolbar,
  InputAdornment,
  Box,
  Button,
  Badge,
  Container,
} from "@mui/material";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useEffect, useState } from "react";
import { decodeToken } from "@/utils/decodeToken";
import { getUserById } from "@/utils/apiSeller";

const pages = [
  {
    page: "Catálogo",
    link: "/",
  },
  {
    page: "Registrarse",
    link: "/register-user/signup",
  },
  {
    page: "Iniciar Sesión",
    link: "/register-user/login",
  },
];

const pagesUserBuyer = [
  {
    page: "catalogo",
    link: "/bouquet",
  },
  {
    page: "Encuentra el ramo perfecto",
    link: "/bouquet",
  },
];

const pagesUserSeller = [
  {
    page: "panel de Administrador",
    link: "/dashboard",
  },
  {
    page: "Crea un nuevo ramo",
    link: "/dashboard/addProduct",
  },
];
const iconNavBar = [SearchIcon, ShoppingCartOutlinedIcon];

export default function ResponsiveNavBar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // console.log("user", user);

  useEffect(() => {
    const localToken = localStorage.getItem("Token");
    if (!localToken) return;

    const decodeUser = decodeToken(localToken);
    console.log(decodeUser);

    getUserById(decodeUser.id, decodeUser.rol)
      .then((response) => setUser(response))
      .catch((error) => setError(error));
  }, []);
  // console.log("usersss", user);

  // let pageToRender = pages;
  // console.log({ pageToRender });
  return (
    <AppBar
      position="sticky"
      color="background"
      sx={{
        boxShadow: 1,
        borderBottom: "none",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <FilterVintageIcon />

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            {pages.map((page) => {
              return (
                <Link href={page.link} key={page.page}>
                  <Button>{page.page}</Button>
                </Link>
              );
            })}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              justifyContent: "center",
              gap: 2,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            {iconNavBar.map((Icon, index) => (
              <Badge
                badgeContent={0}
                key={index}
                sx={{
                  backgroundColor: "secondary.main",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                <Icon color="primary" />
              </Badge>
            ))}
          </Box>

          <TextField
            variant="outlined"
            placeholder="Buscar productos..."
            size="small"
            sx={{
              display: { md: "none" },
              flexGrow: 1,
              mx: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: 5,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <MenuIcon
            color="primary"
            fontSize="large"
            sx={{ display: { md: "none" } }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
