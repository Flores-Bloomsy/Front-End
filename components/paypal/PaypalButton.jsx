import { setTransaction } from "@/utils/paymentPaypal";
import { Box, Skeleton } from "@mui/material";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaypalButton({
  customerId,
  products,
  orderNumber,
  orderId,
}) {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton animation="wave" sx={{ height: "75px" }} />
        <Skeleton animation="wave" sx={{ height: "75px" }} />
        <Skeleton animation="wave" sx={{ height: "75px" }} />
      </Box>
    );
  }

  // Función para crear el pedido
  const createOrder = async () => {
    const formattedProducts = products.map((product) => ({
      sellerId: product.sellerId,
      totalPrice: Math.round(product.totalPrice * 100) / 100,
    }));

    console.log({ formattedProducts });
    const orderData = {
      customerId,
      orderNumber,
      products: formattedProducts,
    };

    //console.log("datos enbiados", JSON.stringify(orderData, null, 2));

    try {
      // Enviar los datos al backend para crear el pago en PayPal
      const response = await fetch(`${API_URL}/order/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el pago en el backend");
      }

      const result = await response.json();
      console.log("Respuesta del backend:", result);

      return result.id;
    } catch (error) {
      console.error("Error al crear la orden de PayPal:", error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    // Captura el pago
    const details = await actions.order.capture();

    if (!details) {
      console.error("Error al capturar el pago");
      return;
    }

    // Aquí puedes manejar la captura y redirección del pago, si es necesario
    console.log("Pago capturado exitosamente:", details);

    const paypalTransactionId = details.id; // ID de la transacción de PayPal
    const paymentStatus = details.status;

    if (paymentStatus !== "COMPLETED") {
      console.error("El pago no se completó correctamente.");
      return;
    }

    console.log("Redirigiendo al home...");
    window.location.href = `/orders/${orderId}`;

    try {
      const data = setTransaction(orderId, paypalTransactionId, paymentStatus);

      if (!data.ok) {
        throw new Error("Error al actualizar el estado del pago en el backend");
      }

      // O la URL que quieras
    } catch (error) {
      console.error(error);
    }
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
}
