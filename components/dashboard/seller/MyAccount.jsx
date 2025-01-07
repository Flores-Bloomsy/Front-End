import CardAddImg from "@/components/profileConfig/CardAddImg";
import ProfileDetails from "../ProfileDetails";
import { useEffect, useState } from "react";
import { decodeToken } from "@/utils/decodeToken";
import { getUserById } from "@/utils/apiSeller";
import { useRouter } from "next/router";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  //solo se ejecuta en el cliente
  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    if (!token) {
      router.push("/register-user/login");
      return;
    }

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
