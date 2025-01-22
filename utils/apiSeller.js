const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function SignupUserSeller(email, password) {
  console.log("Datos enviados:", { email, password });
  const response = await fetch(`${API_URL}/userseller`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  const data = await response.json();
  return data;
}

export async function LoginUserSeller(email, password) {
  try {
    const response = await fetch(`${API_URL}/userseller/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error en el login:", data.message);
      return { success: false, message: data.message || "Login failed" };
    }

    return data;
  } catch (error) {
    console.error("Error al realizar el login:", error.message || error);
    throw error;
  }
}

export async function configProfile(dataUpdate, userId, userRole) {
  console.log("api", dataUpdate);
  try {
    const token = localStorage.getItem("Token");

    if (!token) throw new Error("no tienes autorizacion");

    if (!dataUpdate || !userId)
      throw new Error("faltan datos requeridos para actualizar el perfil");

    const url =
      userRole === "buyer"
        ? `${API_URL}/auth/update/${userId}`
        : `${API_URL}/userseller/update/${userId}`;

    console.log(url);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUpdate),
    });

    const data = await response.json();
    if (!data) throw new Error(data.message || `Error: ${response.status}`);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserById(userId, userRole) {
  try {
    const url =
      userRole === "buyer"
        ? `${API_URL}/auth/${userId}`
        : `${API_URL}/userseller/${userId}`;

    // console.log(url);

    const response = await fetch(url);

    const data = await response.json();
    if (!data) throw new Error(`data.message || Error: ${response.status}`);

    return data.data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getOrdersForSeller() {
  const token = localStorage.getItem("Token");

  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${API_URL}/order/orders-by-seller`, {
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
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);

    return data.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getSellerProducts() {
  const token = localStorage.getItem("Token");

  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${API_URL}/bouquet/get-seller-bouquets`, {
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
