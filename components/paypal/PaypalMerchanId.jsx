"user client";

import React, { useEffect, useState } from "react";
import { getUserById } from "@/utils/apiSeller";
import { Box } from "@mui/material";
import Link from "next/link";
import { decodeToken } from "@/utils/decodeToken";

export default function PaypalMerchanId() {
  const [showButton, setShowButton] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      const { id, rol } = decodeToken(token);
      setUserId(id);
      setUserRole(rol);
    }
  }, []);

  useEffect(() => {
    async function checkPaypalStatus() {
      try {
        if (!userId || !userRole) {
          console.error("No user data found in the token!");
          return;
        }

        const user = await getUserById(userId, userRole);

        // console.log("Fetched user:", user);

        if (!user?.paypalMerchantId) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setShowButton(false);
      }
    }

    if (userId && userRole) {
      checkPaypalStatus();
    }
  }, [userId, userRole]);

  return (
    <Box>
      {showButton && (
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "red",
            py: "25px",
            mx: "55px",
            mt: "15px",
            borderRadius: "13px",
            color: "white",
          }}
        >
          ⚠️ Antes de agregar un pruductos te recomendamos que primero registres
          tu cuenta bancaria{" "}
          <Link href={"/dashboard/paypalRegister"}>AQUI</Link>
          <br />
          para que puedas recibir tus pagos
        </Box>
      )}
    </Box>
  );
}
