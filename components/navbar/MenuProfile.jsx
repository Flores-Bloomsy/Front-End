import { useRouter } from "next/router";

import { ListItemIcon, Menu, MenuItem } from "@mui/material";
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
      <MenuItem>{user?.name || user?.storeName} </MenuItem>
      {pagesToRender.map((page) => (
        <MenuItem key={page} onClick={() => router.push(page.link)}>
          {page.page}
        </MenuItem>
      ))}
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Cerrar sesión
      </MenuItem>
    </Menu>
  );
}
