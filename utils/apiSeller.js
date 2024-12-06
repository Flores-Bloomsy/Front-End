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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en el login:", errorData.message);
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    console.log("respuesta del backend", data);

    if (data.success && data.data.toke) {
      localStorage.setItem("Token", data.data.toke);

      return data.data.toke;
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error al realizar el login:", error);
    throw error;
  }
}
