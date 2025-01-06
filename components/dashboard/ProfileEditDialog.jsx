import { useFileUpload } from "@/hooks/useUploadImg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function ProfileEditDialog({
  open,
  onClose,
  selectedField,
  editableValue,
  handleAddressChange,
  handleSave,
  setEditableValue,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Editar{" "}
        {selectedField === "address"
          ? "Dirección"
          : selectedField === "name"
          ? "Nombre"
          : "Teléfono"}
      </DialogTitle>
      <DialogContent>
        {selectedField === "address" ? (
          <>
            <TextField
              fullWidth
              label="Calle"
              value={editableValue.address.street || ""}
              onChange={handleAddressChange}
              name="street"
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Número"
              value={editableValue.address.number || ""}
              onChange={handleAddressChange}
              name="number"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Ciudad"
              value={editableValue.address.city || ""}
              onChange={handleAddressChange}
              name="city"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Estado"
              value={editableValue.address.state || ""}
              onChange={handleAddressChange}
              name="state"
              sx={{ mb: 2 }}
            />
            <TextField
              type="number"
              fullWidth
              label="Código Postal"
              value={editableValue.address.postalCode || ""}
              onChange={handleAddressChange}
              name="postalCode"
              sx={{ mb: 2 }}
            />
          </>
        ) : (
          <TextField
            fullWidth
            value={editableValue || ""}
            onChange={(e) => setEditableValue(e.target.value)}
            autoFocus
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
