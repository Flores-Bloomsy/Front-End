import CardAddImg from "@/components/profileConfig/CardAddImg";
import ProfileDetails from "../ProfileDetails";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { decodeToken } from "@/utils/decodeToken";
import { getUserById } from "@/utils/apiSeller";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  console.log(user);
  //solo se ejecuta en el cliente
  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);

    const decodeUser = decodeToken(token);

    //obtengo los datos del usuario
    getUserById(decodeUser.id, decodeUser.rol)
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <ProfileDetails
      name={user?.storeName || user?.name}
      phone={user?.phone}
      address={user?.address}
      role={user?.rol}
      userId={user?._id}
      email={user?.email}
      picture={user?.profilePic}
    />
  );
}
