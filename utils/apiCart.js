const API_URL = process.env.NEXT_PUBLIC_API_URL;

//traer los productos del cart
export const fetchCartItems = async (setCartItems, setLoading) => {
  try {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await fetch("http://localhost:8080/cart/get-cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();
    const items = data.data.items.map((item) => ({
      storeName: "Nombre de la tienda",
      sellerId: item.bouquetFlowerId.ownerId,
      name: item.bouquetFlowerId.name,
      image: item.bouquetFlowerId.images[0],
      price: item.bouquetFlowerId.price,
      quantity: item.quantity,
      totalPrice: item.bouquetFlowerId.price * item.quantity,
      bouquetFlowerId: item.bouquetFlowerId._id,
      shippingStatus: "pending",
    }));
    //console.log("data URL:", data);
    setCartItems(items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  } finally {
    setLoading(false);
  }
};

//incrmentar el producto del carrito
export const handleIncrement = async (itemId, cartItems, setCartItems) => {
  const token = localStorage.getItem("Token");
  console.log("itemId enviado:", itemId);

  // Buscar el producto en el carrito
  const updatedCartItems = cartItems.map((item) =>
    item.bouquetFlowerId === itemId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  console.log("actualizar data", updatedCartItems);

  setCartItems(updatedCartItems); // Actualizamos el estado localmente

  // Enviar la actualización al backend
  try {
    const response = await fetch(
      "http://localhost:8080/cart/update-product-quantity",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bouquetFlowerId: itemId, // ID único del producto
          quantity: updatedCartItems.find(
            (item) => item.bouquetFlowerId === itemId
          ).quantity, // Nueva cantidad
        }),
      }
    );
    console.log("soy response", response);

    const data = await response.json();
    console.log("soy data de", data);
    if (!data.success) {
      throw new Error("Error al actualizar la cantidad");
    }
  } catch (error) {
    console.error(error.message);
  }
};

// decrementar el producto del carrito
export const handleDecrement = async (itemId, cartItems, setCartItems) => {
  const token = localStorage.getItem("Token");

  // Solo permitir decremento si la cantidad es mayor a 1
  const updatedCartItems = cartItems.map((item) =>
    item.bouquetFlowerId === itemId && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );

  setCartItems(updatedCartItems); // Actualizamos el estado localmente

  // Enviar la actualización al backend
  try {
    const response = await fetch(
      "http://localhost:8080/cart/update-product-quantity",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bouquetFlowerId: itemId, // ID único del producto
          quantity: updatedCartItems.find(
            (item) => item.bouquetFlowerId === itemId
          ).quantity, // Nueva cantidad
        }),
      }
    );

    const data = await response.json();
    if (!data.success) {
      throw new Error("Error al actualizar la cantidad");
    }
  } catch (error) {
    console.error(error.message);
  }
};

// eliminar producto del carrito
export const handleRemove = async (id, setCartItems) => {
  const token = localStorage.getItem("Token");
  try {
    const response = await fetch(
      `http://localhost:8080/cart/remove-product/${id}`, // Asegúrate de pasar el id correcto
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, //  requiere autenticación, pasa el token aquí
        },
      }
    );

    const data = await response.json();
    if (data.success) {
      console.log("Producto removido");
      // Actualiza el carrito para reflejar el cambio
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.bouquetFlowerId !== id)
      );
    } else {
      console.error("Error al eliminar el producto:", data.message);
    }
  } catch (error) {
    console.error("Error en la eliminación:", error);
  }
};

export async function getShoppingCartById() {
  const token = localStorage.getItem("Token");

  if (!token) throw new Error("El usuario no está autenticado");

  try {
    const response = await fetch(`${API_URL}/cart/get-cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function addProductToShoppingCart(product) {
  const token = localStorage.getItem("Token");
  if (!token) throw new Error("El usuario no está autenticado");

  try {
    const response = await fetch(`${API_URL}/cart/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
