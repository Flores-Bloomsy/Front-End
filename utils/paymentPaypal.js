const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const setTransaction = async (
  orderId,
  paypalTransactionId,
  paymentStatus
) => {
  console.log({ orderId });
  const token = localStorage.getItem("Token");

  try {
    const response = await fetch(
      `${API_URL}/order/update-paypal-transaction/${orderId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paypalTransactionId,
          paymentStatus,
        }),
      }
    );
    console.log({ response });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating paypalTransactionId:", errorData);
      throw new Error(errorData.message || "Failed to update transaction ID");
    }

    const result = await response.json();
    console.log("Transaction ID updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
