export function handleLocalCart(
  productId,
  name,
  image,
  quantity,
  price,
  enqueueSnackbar
) {
  const localProduct = {
    bouquetFlowerId: productId,
    name: name,
    image: image,
    quantity: quantity,
    price: price,
  };

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) cart = { items: [] };

  const existingItem = cart.items.findIndex(
    (item) => item.bouquetFlowerId === productId
  );

  if (existingItem >= 0) {
    cart.items[existingItem].quantity += quantity;
    enqueueSnackbar("Se actualizó el producto en tu carrito", {
      variant: "success",
      autoHideDuration: 5000,
    });
  } else {
    cart.items.push(localProduct);
    enqueueSnackbar("Producto agregado al carrito", {
      variant: "success",
      autoHideDuration: 5000,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
