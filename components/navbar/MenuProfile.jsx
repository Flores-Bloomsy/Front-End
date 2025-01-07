import { useRouter } from "next/router";

import {
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuProfile({
  open,
  user,
  handleClose,
  anchorEl,
  onLogout,
  pagesToRender,
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  console.log(user);

  function logout() {
    onLogout();

    router.push("/");
  }
  return (
    <Menu
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      anchorEl={anchorEl}
    >
      <MenuItem onClick={() => router.push("/dashboard")}>
        {user?.name || user?.storeName}{" "}
      </MenuItem>
      {isMobile &&
        pagesToRender.map((page) => (
          <MenuItem key={page} onClick={() => router.push(page.link)}>
            {page.page}
          </MenuItem>
        ))}
      {user && (
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      )}
    </Menu>
  );
}
