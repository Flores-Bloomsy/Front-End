const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createProduct = async (data, token) => {
  try {
    // Estructura del body con los datos del formulario
    const productData = {
      name: data.nameProduct,
      description: data.productDescription,
      images: data.images,
      price: data.productPrice,
      stock: data.productQuantity,
      details: {
        occasion: data.ocacion,
        size: data.Tamano,
        color: data.color,
        style: data.estilo,
        flowerType: data.floresYTipos,
        personality: data.personalida,
      },
    };
    console.log(productData);

    // Hacemos la solicitud POST al backend
    const response = await fetch(
      "http://localhost:8080/bouquet/create-bouquet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      }
    );

    // Parseamos la respuesta
    const result = await response.json();

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
      return { success: true, data: result.data };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return { success: false, message: "Error en la conexión con el servidor." };
  }
};

export async function getAllProduct() {
  try {
    const response = await fetch(`${API_URL}/bouquet/get-bouquets`);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();

    return data.data.allBouquets;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/bouquet/${id}`);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    return data.data.getBouquetById;
  } catch (error) {
    throw new Error(error.message);
  }
}
