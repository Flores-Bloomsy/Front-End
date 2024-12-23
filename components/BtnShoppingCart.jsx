import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export default function BtnShopingCart({
  productId,
  quantity = 1,
  image,
  name,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) cart = { items: [] };

    const existingItem = cart.items.findIndex(
      (item) => item.bouquetFlowerId === productId
    );

    if (existingItem >= 0) {
      cart.items[existingItem].quantity += quantity;
      console.log(cart);
      enqueueSnackbar("se actualizo el producto en tu carrito", {
        variant: "success",
        autoHideDuration: 5000,
      });
    } else {
      cart.items.push({
        bouquetFlowerId: productId,
        name: name,
        image: image,
        quantity: quantity,
      });
      enqueueSnackbar("producto agregado al carrito", {
        variant: "success",
        autoHideDuration: 5000,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

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
