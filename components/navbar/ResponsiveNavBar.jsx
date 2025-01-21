import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";

import Link from "next/link";

import MenuProfile from "./MenuProfile";
import { decodeToken } from "@/utils/decodeToken";
import { getUserById } from "@/utils/apiSeller";
import {
  fetchCartItems,
  handleDecrement,
  handleIncrement,
} from "@/utils/apiCart";

import {
  AppBar,
  TextField,
  Toolbar,
  InputAdornment,
  Box,
  Button,
  Container,
  Avatar,
  IconButton,
} from "@mui/material";
//import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchInput from "./SearchInput";
import { useSearch } from "@/context/SearchContext";

import InputPhone from "./inputPhone";

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
    link: "/bouquet/recommendation",
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
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { searchQueryContext, setSearchQueryContext } = useSearch();

  const router = useRouter();

  const open = Boolean(anchorEl);

  let pageToRender = pages;

  const handleSearch = (query) => {
    // Si el input está vacío, restablecemos el contexto a su estado inicial
    if (query === "") {
      setSearchQueryContext(""); // Vaciar el contexto
    } else {
      setSearchQueryContext(query); // Actualizar el valor de búsqueda
    }

    //console.log("Buscando:", query);
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);

    setSearchQuery(searchQuery);
  };

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
  }, [router]);

  useEffect(() => {
    fetchCartItems(setCartItems, setLoading);
  }, []);

  useEffect(() => {
    const updatedTotalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(updatedTotalQuantity);
  }, [cartItems]);

  pageToRender =
    user?.rol === "seller"
      ? pagesUserSeller
      : user?.rol === "buyer"
      ? pagesUserBuyer
      : pages;
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
          <Link href="/">
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: "45px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              alt="logo de la imagen"
              src="/BloomsAndsBits.png"
            />
          </Link>

          {!searchVisible && (
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
          )}
          <Box
            sx={{
              flexGrow: 0,
              justifyContent: "center",
              gap: 2,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            {searchVisible && <SearchInput onSearch={handleSearch} />}

            {(!user || user?.rol === "buyer") &&
              iconNavBar.map((Icon, index) => (
                <React.Fragment key={index}>
                  {Icon === SearchIcon ? (
                    <IconButton
                      onClick={handleSearchClick}
                      sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": {
                          backgroundColor: "tertiary.main",
                        },
                      }}
                    >
                      <Icon color="primary" />
                    </IconButton>
                  ) : Icon === ShoppingCartOutlinedIcon ? (
                    <IconButton
                      component={Link}
                      href="/cart"
                      sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": {
                          backgroundColor: "tertiary.main",
                        },
                      }}
                    >
                      <Icon color="primary" />
                      {totalQuantity > 0 && (
                        <Box
                          component="span"
                          sx={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            backgroundColor: "primary.main",
                            color: "white",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {totalQuantity}
                        </Box>
                      )}
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": {
                          backgroundColor: "tertiary.main",
                        },
                      }}
                    >
                      <Icon color="primary" />
                    </IconButton>
                  )}
                </React.Fragment>
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

          <InputPhone onSearch={handleSearch} />
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
