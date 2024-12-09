import {
  AppBar,
  TextField,
  Toolbar,
  InputAdornment,
  Box,
  Button,
  Badge,
  Container,
  Avatar, //Importar 'Avatar'para mostrar la imagen de perfil
} from "@mui/material";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/accountCircle"; // Importar icono de perfil
import Link from "next/link";
import { useUser } from "../context/UserState"; //Estado del usuario

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
const iconNavBar = [ShoppingCartOutlinedIcon];

export default function ResponsiveNavBar() {
  const { user, login, logout } = useUser(); // Obtenemos el estado del usuario

  return (
    <AppBar
      position="static"
      color="background"
      sx={{
        boxShadow: "none",
        borderBottom: "none",
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
                  marginRight: index === iconNavBar.length - 1 ? "15px" : "0", // Agregar margen al último icono de la derecha
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
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              justifyContent: "center",
              gap: 2,
            }}
          >
            {" "}
            <Badge
              badgeContent={0}
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "50%",
                padding: "5px",
              }}
            >
              {" "}
              <SearchIcon color="primary" />{" "}
            </Badge>{" "}
            <MenuIcon
              color="primary"
              fontSize="large"
              sx={{ display: { md: "none" } }}
            />{" "}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

//   return (
//     <AppBar position="static" color="background" sx={{ height: 58 }}>
//       <Container maxWidth="xl" sx={{ height: "100%" }}>
//         <Toolbar
//           disableGutters
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             height: "100%",
//             justifyItems: "space-between",
//           }}
//         >
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuRoundedIcon color="primary" />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography sx={{ textAlign: "center" }}>{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex" },
//               justifyContent: "center",
//             }}
//           >
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "primary", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton
//                 onClick={handleOpenUserMenu}
//                 sx={{ p: 0, display: "flex", gap: 1 }}
//               >
//                 <Badge
//                   badgeContent={0}
//                   sx={{
//                     backgroundColor: "#FFB8A7",
//                     borderRadius: 100,
//                     padding: 0.5,
//                   }}
//                 >
//                   <SearchIcon color="primary" />
//                 </Badge>
//                 <Badge
//                   badgeContent={0}
//                   sx={{
//                     backgroundColor: "#FFB8A7",
//                     borderRadius: 100,
//                     padding: 0.5,
//                   }}
//                 >
//                   <ShoppingCartIcon color="primary" />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: "center" }}>
//                     {setting}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
