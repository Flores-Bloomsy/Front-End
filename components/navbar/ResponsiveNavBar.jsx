import {
  AppBar,
  TextField,
  Toolbar,
  InputAdornment,
  Box,
  Button,
  useTheme,
  Container,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { decodeToken } from "@/utils/decodeToken";
import { getUserById } from "@/utils/apiSeller";
import { useEffect, useState } from "react";
import MenuProfile from "./MenuProfile";

const pages = [
  {
    page: "Catálogo",
    link: "/bouquet",
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const open = Boolean(anchorEl);

  let pageToRender = pages;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleLogout() {
    localStorage.removeItem("Token");
    localStorage.removeItem(`user_${user._id}_${user.rol}`);

    setUser(null);
  }

  useEffect(() => {
    const localToken = localStorage.getItem("Token");
    if (!localToken) return;

    const decodeUser = decodeToken(localToken);

    getUserById(decodeUser.id, decodeUser.rol)
      .then((response) => setUser(response))
      .catch((error) => console.log(error));
  }, []);

  pageToRender =
    user?.rol === "seller"
      ? pagesUserSeller
      : user?.rol === "buyer"
      ? pagesUserBuyer
      : pages;
  console.log(pageToRender);
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
            {pageToRender.map((page) => {
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
              <IconButton
                key={index}
                sx={{
                  backgroundColor: "secondary.main",
                  "&:hover": {
                    backgroundColor: "tertiary.main",
                  },
                }}
              >
                <Icon color="primary" />
              </IconButton>
            ))}
            {user && (
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  src={user?.profilePic || undefined}
                  alt={user?.email}
                  onClick={handleClick}
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "tertiary.main",
                    },
                  }}
                >
                  {user?.email?.charAt(0).toUpperCase()}{" "}
                </Avatar>
              </IconButton>
            )}
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
          {user ? (
            <IconButton sx={{ p: 0 }}>
              <Avatar
                src={user?.profilePic || undefined}
                alt={user?.email}
                onClick={handleClick}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "text.primary",
                  display: { md: "none" },
                  "&:hover": {
                    backgroundColor: "tertiary.main",
                  },
                }}
              >
                {user?.email?.charAt(0).toUpperCase()}{" "}
              </Avatar>
            </IconButton>
          ) : (
            <MenuIcon
              color="primary"
              fontSize="large"
              sx={{ display: { md: "none" } }}
              onClick={handleClick}
            />
          )}
        </Toolbar>
      </Container>
      <MenuProfile
        open={open}
        user={user}
        handleClose={handleClose}
        anchorEl={anchorEl}
        onLogout={handleLogout}
        pagesToRender={pageToRender}
      />
    </AppBar>
  );
}
