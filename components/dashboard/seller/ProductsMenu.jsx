import EditProductDialog from "@/components/EditProductDialog";
import { deleteProductById } from "@/utils/apiProduct";

import { Menu, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

async function deleteProduct(onClose, product, enqueueSnackbar) {
  try {
    const response = await deleteProductById(product._id);
    console.log(response);

    enqueueSnackbar("Producto eliminado exitosamente", { variant: "success" });

    onClose();
  } catch (error) {
    if (error.message === "bouquet not found") {
      // Producto no encontrado
      enqueueSnackbar("El producto no existe. Por favor, refresca la página.", {
        variant: "error",
      });
    } else {
      // Otro tipo de error
      enqueueSnackbar("Error al eliminar el producto", { variant: "error" });
    }
  }
}

export default function ProductsMenu({ anchorEl, open, onClose, product }) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleEditClick = () => {
    setEditDialogOpen(true); // Cerrar el menú al abrir el diálogo
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    onClose();
  };

  const menuItems = [
    {
      text: "Eliminar",
      action: () => deleteProduct(onClose, product, enqueueSnackbar),
    },
    {
      text: "Actualizar Inventario",
      action: handleEditClick,
    },
  ];
  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              item.action();
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
      <EditProductDialog
        openDialog={isEditDialogOpen}
        closeDialog={handleCloseEditDialog}
        productToUpdate={product}
      />
    </>
  );
}
