const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Signup(email, password) {
  // Obtener el carrito desde el localStorage
  let shoppingCart = JSON.parse(localStorage.getItem("cart"));

  // Si no hay carrito o está vacío, asignamos un carrito vacío
  if (!shoppingCart || !shoppingCart.items || shoppingCart.items.length === 0) {
    shoppingCart = { items: [] }; // Asignamos un carrito vacío
  } else {
    // Si existe un carrito con productos, actualizamos los elementos
    shoppingCart.items = shoppingCart.items.map((item) => ({
      bouquetFlowerId: item.bouquetFlowerId,
      quantity: item.quantity,
    }));
  }

  // Enviar la solicitud de registro al servidor
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, cart: shoppingCart }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  const data = await response.json();

  localStorage.removeItem("cart");

  return data;
}

export async function Login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en el login:", errorData.message);
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    if (data.success && data.token) {
      localStorage.setItem("Token", data.token);

      return data.token;
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error al realizar el login:", error);
    throw error;
  }
}

export async function getOrdersByUser() {
  const token = localStorage.getItem("Token");

  try {
    if (!token) throw new Error("Unauthorized");

    const response = await fetch(`${API_URL}/order/orders-by-buyer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
