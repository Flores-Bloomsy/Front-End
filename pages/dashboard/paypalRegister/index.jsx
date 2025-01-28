import React, { useState } from "react";
import { decodeToken } from "@/utils/decodeToken";
import { Button, Container } from "@mui/material";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RedirectSellerButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRedirect = async () => {
    // Obtener el token de localStorage
    const token = localStorage.getItem("Token");
    const decodedToken = decodeToken(token);
    //console.log("decoToken", decodedToken);

    if (!decodedToken || !decodedToken.id) {
      console.error("Token inválido o ID no encontrado.");
      return;
    }

    const sellerId = decodedToken.id; //  el ID está en decodedToken.id

    //console.log({ sellerId });

    try {
      setIsLoading(true);
      setError(null); // Restablecer el error si existe

      // Enviar el ID al backend
      const response = await fetch(
        `${API_URL}/userseller/create-partner-referral`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el Partner Referral.");
      }

      // Si la solicitud es exitosa, puedes hacer algo con la respuesta
      const data = await response.json();
      //console.log("Respuesta del backend:", data);

      // Aquí manejamos la redirección a la URL de PayPal

      if (data.success && data.data.links && data.data.links[1]) {
        const paypalUrl = data.data.links[1].href; // URL para redirigir al vendedor

        window.open(paypalUrl, "_blank");
      } else {
        console.error("No se encontró la URL de PayPal.");
        setError("No se encontró la URL de PayPal.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Hubo un problema al crear el Partner Referral.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        sx={{ color: "blue", m: 0 }}
        onClick={handleRedirect}
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "AQUI"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default RedirectSellerButton;
