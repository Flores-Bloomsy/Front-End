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
