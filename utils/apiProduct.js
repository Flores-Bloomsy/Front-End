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
    const response = await fetch(`${API_URL}/bouquet/create-bouquet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

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
    const response = await fetch(`${API_URL}/bouquet/get-bouquet-by-id/${id}`);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorDetails.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    // console.log("soy data de getProduct", data);
    return data.data.getBouquetById;
  } catch (error) {
    throw new Error(error.message);
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

export async function deleteProductById(productId) {
  const token = localStorage.getItem("Token");

  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${API_URL}/bouquet/delete/${productId}`, {
      method: "DELETE",
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
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function updateProductById(productId, data) {
  const token = localStorage.getItem("Token");

  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${API_URL}/bouquet/update/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getBouquetByFilter(filter) {
  try {
    const response = await fetch(
      `${API_URL}/bouquet/search?occasion=${filter.occasion}&size=${filter.size}&color=${filter.color}&style=${filter.style}&flowerType=${filter.flowerType}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function searchBouquetsByKeyword(searchQuery) {
  try {
    const response = await fetch(
      `${API_URL}/bouquet/searchByKeyword?searchQuery=${searchQuery}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al buscar bouquets:", error.message);
    throw error;
  }
}
