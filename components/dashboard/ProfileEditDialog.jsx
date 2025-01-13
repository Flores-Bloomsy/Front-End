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
  const isSaveDisabled =
    selectedField === "address"
      ? !editableValue.address.street ||
        !editableValue.address.number ||
        !editableValue.address.city ||
        !editableValue.address.state ||
        !editableValue.address.postalCode
      : !editableValue;
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
              value={editableValue.address.street}
              onChange={handleAddressChange}
              name="street"
              error={!editableValue.address.street}
              helperText={
                !editableValue.address.street ? "Este campo es obligatorio" : ""
              }
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Número"
              value={editableValue.address.number}
              onChange={handleAddressChange}
              name="number"
              error={!editableValue.address.number}
              helperText={
                !editableValue.address.number ? "Este campo es obligatorio" : ""
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Ciudad"
              value={editableValue.address.city}
              onChange={handleAddressChange}
              name="city"
              error={!editableValue.address.city}
              helperText={
                !editableValue.address.city ? "Este campo es obligatorio" : ""
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Estado"
              value={editableValue.address.state}
              onChange={handleAddressChange}
              name="state"
              error={!editableValue.address.state}
              helperText={
                !editableValue.address.state ? "Este campo es obligatorio" : ""
              }
              sx={{ mb: 2 }}
            />
            <TextField
              type="number"
              fullWidth
              label="Código Postal"
              value={editableValue.address.postalCode}
              onChange={handleAddressChange}
              name="postalCode"
              error={!editableValue.address.postalCode}
              helperText={
                !editableValue.address.postalCode
                  ? "Este campo es obligatorio"
                  : ""
              }
              sx={{ mb: 2 }}
            />
          </>
        ) : (
          <TextField
            fullWidth
            value={editableValue}
            onChange={(e) => setEditableValue(e.target.value)}
            error={!editableValue}
            helperText={!editableValue ? "Este campo es obligatorio" : ""}
            autoFocus
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button disabled={isSaveDisabled} onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
