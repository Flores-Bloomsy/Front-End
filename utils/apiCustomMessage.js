const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addCustomMessageById(orderId, message) {
  const localToken = localStorage.getItem("Token");
  try {
    if (!localToken) throw new Error("Token not found. Action blocked.");
    const response = await fetch(
      `${API_URL}/order/add-customMessage/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localToken}`,
        },
        body: JSON.stringify(message),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("errp", error.message);
    throw new Error(error.message);
  }
}

export async function getCustomMessageById(id) {
  try {
    const response = await fetch(`${API_URL}/order/get-custom-message/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("data", data);
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
