const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const placeOrder = async (shipping, items) => {
  const shippingAddress = {
    street: shipping.street,
    name: shipping.name,
    number: shipping.number,
    city: shipping.city,
    postalCode: shipping.postalCode,
    state: shipping.state,
    country: shipping.country,
  };

  const payload = {
    products: items.map((item) => ({
      productId: item.bouquetFlowerId,
      sellerId: item.sellerId,
      storeName: item.storeName,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
      shippingStatus: item.shippingStatus,
    })),
    shippingAddress,
    totalAmount: items.reduce((sum, item) => sum + item.totalPrice, 0),
    paypalTransactionId: items.paypalTransactionId,
    customMessage: "Por favor, entregar por la mañana",
    orderStatus: items.orderStatus,
  };

  // Llama a la API para crear la orden
  return await sendOrderToServer(payload);
};

const sendOrderToServer = async (payload) => {
  const token = localStorage.getItem("Token");
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_URL}/order/new-order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from server:", errorData);

      return {
        ok: false,
        message: errorData.message || "Failed to create order",
      };
    }

    const result = await response.json();
    console.log("Order created successfully:", result);
    return { ok: true, data: result };
  } catch (error) {
    console.error("Error creating order:", error);
    return { ok: false, message: error.message || "Unexpected error occurred" };
  }
};

//traer ultima orden

export const getLatestOrder = async () => {
  const token = localStorage.getItem("Token");
  try {
    const res = await fetch(`${API_URL}/order/orders-by-buyer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Verificamos si la respuesta es correcta
    if (!res.ok) {
      throw new Error("Error al obtener las órdenes");
    }

    // Obtenemos los datos de la respuesta
    const data = await res.json();

    // Si no hay órdenes, lanzamos un error
    if (!data.success || !data.data || data.data.length === 0) {
      throw new Error("No se encontraron órdenes para este comprador");
    }

    // Ordenamos las órdenes por fecha de creación (o por el ID si no tienes la fecha)
    const sortedOrders = data.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Retornamos la última orden (la más reciente)
    return sortedOrders[0];
  } catch (error) {
    console.error("Error al obtener la última orden:", error);
    return null;
  }
};

// traer todas las ordenes del usuario

export const getOrdersByUserId = async () => {
  const token = localStorage.getItem("Token");
  try {
    const res = await fetch(`${API_URL}/order/orders-by-buyer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Verificamos si la respuesta es correcta
    if (!res.ok) {
      throw new Error("Error al obtener las órdenes del usuario");
    }

    // Obtenemos los datos de la respuesta
    const data = await res.json();

    console.log("usuario", data);

    // Si no hay órdenes, lanzamos un error
    if (!data.success || !data.data || data.data.length === 0) {
      throw new Error("No se encontraron órdenes para este usuario");
    }

    // Retornamos todas las órdenes obtenidas
    return {
      ok: true,
      data: data,
    };
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    return {
      ok: false,
      data: null,
      errorMessage: error.message,
    };
  }
};
