import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { decodeToken } from "@/utils/decodeToken";

//dashboard usuario vendedor
import NavItemsBuyer from "@/components/dashboard/buyer/NavItemsBuyer";
import Orders from "@/components/dashboard/seller/Orders";
import Products from "@/components/dashboard/seller/Products";
import MyAccount from "@/components/dashboard/seller/MyAccount";

//dashboard usuario comprador
import NavItemsSeller from "@/components/dashboard/seller/NavItemsSeller";
// import TrackOrder from "@/components/dashboard/buyer/TrackOrder";
import MyOrders from "@/components/dashboard/buyer/MyOrders";
// import Favorites from "@/components/dashboard/buyer/Favorites";

import { Container, Divider } from "@mui/material";
import RedirectSellerButton from "./paypalRegister";

export default function Dashboard() {
  const [userToken, setUserToken] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const router = useRouter();
  console.log("aa", userToken);

  function renderContent() {
    const contentMap = {
      seller: {
        Ordenes: <Orders />,
        Productos: <Products />,
        "Mi Cuenta": <MyAccount />,
      },
      buyer: {
        "Mis Pedidos": <MyOrders />,
        // Favoritos: <Favorites />,
        // Segimiento: <TrackOrder />,
        "Mi Cuenta": <MyAccount />,
      },
    };

    // Usamos el rol y el menu seleccionado para obtener el componente correcto
    return contentMap[userToken?.rol]?.[selectedMenu] || <MyAccount />;
  }

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      router.push("/");
      return;
    }

    const userDecode = decodeToken(token);

    setUserToken(userDecode);
  }, []);

  return (
    <Container sx={{ display: "flex", gap: 2, mt: 5, height: "80vh" }}>
      {userToken?.rol === "seller" ? (
        <NavItemsSeller
          onSelect={setSelectedMenu}
          userId={userToken?.id}
          rol={userToken?.rol}
        />
      ) : (
        <NavItemsBuyer
          onSelect={setSelectedMenu}
          userId={userToken?.id}
          rol={userToken?.rol}
        />
      )}
      <Divider
        sx={{ display: { xs: "none", sm: "block" } }}
        orientation="vertical"
        flexItem
      />
      {renderContent()}
    </Container>
  );
}
