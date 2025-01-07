import { useState } from "react";
import { useRouter } from "next/router";

import { updateProductById } from "@/utils/apiProduct";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useSnackbar } from "notistack";

export default function EditProductDialog({
  openDialog,
  closeDialog,
  productToUpdate,
}) {
  const router = useRouter();
  const [stock, setStock] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function handleSave() {
    if (stock < 0) {
      enqueueSnackbar("El inventario no puede ser negativo", {
        variant: "warning",
      });
      return;
    }

    try {
      await updateProductById(productToUpdate._id, { stock });

      enqueueSnackbar("Inventario actualizado", { variant: "success" });
      closeDialog();
      router.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error al actualizar el inventario", {
        variant: "error",
      });
    }
  }

  return (
    <Dialog open={openDialog} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogTitle>Actualiza el inventario</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ m: 1 }}
          type="number"
          label="Nuevo Inventario"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
