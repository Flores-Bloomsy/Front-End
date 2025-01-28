import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from "next/router";
import { Height } from "@mui/icons-material";

const GoogleLoginButtonSeller = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Función para manejar la respuesta de Google
  const handleCredentialResponse = async (response) => {
    //console.log("Encoded JWT ID token: " + response.credential);
    setLoading(true);
    try {
      const body = { id_token: response.credential };

      const resp = await fetch(`${API_URL}/api/google/seller`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      // console.log("data!!", data);

      if (data.success) {
        localStorage.setItem("Token", data.token);
        localStorage.setItem("email", data.Seller.email);
        // console.log("Email:", data.Seller.email);

        router.push("/");
      } else {
        console.warn("Error en la respuesta del servidor:", data.message);
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cargar el script de Google Identity al montar el componente
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        // Inicializar la API de Google Identity
        google.accounts.id.initialize({
          client_id:
            "1058930832195-mrhutei71f2kid2b8f8rh2t120tf6pm2.apps.googleusercontent.com", //  client_id de Google
          callback: handleCredentialResponse,
        });

        // Renderizar el botón de Google usando los datos del HTML original
        google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          {
            type: "standard",
            theme: "outline",
            size: "large",
          }
        );
      };
      document.body.appendChild(script);
    };

    // Cargar el script cuando el componente se monta
    loadGoogleScript();

    return () => {
      // Limpiar el script cuando el componente se desmonta
      const scriptTag = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (scriptTag) {
        document.body.removeChild(scriptTag);
      }
    };
  }, []);

  return (
    <Box>
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 1,
          }}
        >
          <Box id="g_id_signin"></Box>
        </Box>
      )}
    </Box>
  );
};

export default GoogleLoginButtonSeller;
