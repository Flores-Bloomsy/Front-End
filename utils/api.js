const API_URL = `http://localhost:8080/auth`;

export async function Signup(email, password) {
  console.log("Datos enviados:", { email, password });
  const response = await fetch(`http://localhost:8080/auth/signup`, {
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

export async function Login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
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
