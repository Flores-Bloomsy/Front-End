import { addProductToShoppingCart } from "@/utils/apiCart";
import { handleLocalCart } from "@/utils/cartUtils";

import { Button } from "@mui/material";
import { useRouter } from "next/router";

import { enqueueSnackbar } from "notistack";

export default function BtnComprarCart({
  productId,
  quantity = 1,
  image,
  name,
  price,
  texto,
  sx,
}) {
  const router = useRouter();
  async function handleAddToCart() {
    const token = localStorage.getItem("Token");

    if (!token) {
      handleLocalCart(productId, name, image, quantity, price, enqueueSnackbar);
      return;
    }

    const backendProduct = {
      bouquetFlowerId: productId,
      quantity: quantity,
    };

    try {
      const response = await addProductToShoppingCart(backendProduct);

      if (response.success) {
        enqueueSnackbar("Producto listo para comprar", {
          variant: "success",
          autoHideDuration: 5000,
        });

        router.push("/cart");
      }
    } catch (error) {
      console.error("Error al comprar producto al carrito:", error.message);
      enqueueSnackbar("Error al comprar el producto. Intenta nuevamente.", {
        variant: "error",
        autoHideDuration: 5000,
      });
    }
  }

  return (
    <Button variant="contained" onClick={handleAddToCart} sx={{ ...sx }}>
      {texto}
    </Button>
  );
}
