const API_URL = `http://localhost:8080`;

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
