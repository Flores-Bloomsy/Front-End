import { addProductToShoppingCart } from "@/utils/api";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { handleLocalCart } from "../utils/cartUtils";

export default function BtnShopingCart({
  productId,
  quantity = 1,
  image,
  name,
  price,
}) {
  const { enqueueSnackbar } = useSnackbar();

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
      await addProductToShoppingCart(backendProduct);
      enqueueSnackbar("Producto agregado/actualizado en tu carrito", {
        variant: "success",
        autoHideDuration: 5000,
      });
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      enqueueSnackbar(
        "Error al agregar producto al carrito. Intenta nuevamente.",
        {
          variant: "error",
          autoHideDuration: 5000,
        }
      );
    }
  }

  return (
    <IconButton
      sx={{
        bgcolor: "secondary.main",
        borderRadius: 4,
      }}
      color="primary"
      onClick={handleAddToCart}
    >
      <ShoppingCartOutlinedIcon color="primary" />
    </IconButton>
  );
}
