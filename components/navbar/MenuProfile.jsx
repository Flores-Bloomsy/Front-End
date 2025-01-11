import { useRouter } from "next/router";

import {
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
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
  const profileIsConfigured = {
    phone: user?.phone,
    name: user?.name || user?.storeName,
    address: {
      street: user?.address?.street,
      city: user?.address?.city,
      state: user?.address?.state,
      number: user?.address?.number,
      postalCode: user?.address?.postalCode,
    },
  };

  function isProfileIncomplete(profile) {
    const address = profile.address;

    const isMainInfoMissing = !profile.name || !profile.phone;
    const isAddressMissing =
      !address.street ||
      !address.city ||
      !address.state ||
      !address.number ||
      !address.postalCode;

    return isMainInfoMissing || isAddressMissing;
  }
  const profileIncomplete = isProfileIncomplete(profileIsConfigured);

  function logout() {
    onLogout();

    router.push("/");
  }

  function navigateToProfileSetup() {
    const link = profileIncomplete ? "/config" : "/dashboard";

    router.push(link);
  }

  return (
    <Menu
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      anchorEl={anchorEl}
    >
      {user && (
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between" }}
          onClick={navigateToProfileSetup}
        >
          {profileIncomplete
            ? "Configura tu perfil"
            : user?.name || user?.storeName}
          <SettingsOutlinedIcon />
        </MenuItem>
      )}
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
