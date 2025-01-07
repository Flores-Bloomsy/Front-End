import { useState } from "react";

import ProfileEditDialog from "./ProfileEditDialog";
import { configProfile } from "@/utils/apiSeller";

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileDetails({
  name,
  phone,
  address,
  role,
  userId,
  picture,
  email,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [editableValue, setEditableValue] = useState({});
  const storeName = name;

  if (!name || !phone || !address) {
    return (
      <Skeleton
        width="100%"
        height={118}
        sx={{ backgroundColor: "#fff", boxShadow: 5 }}
      />
    );
  }

  const details = [
    {
      key: "name",
      label: role === "seller" ? "Nombre de la tienda" : "Nombre",
      value: role === "seller" ? storeName : name,
    },
    {
      key: "phone",
      label: "Teléfono",
      value: phone,
    },
    {
      key: "address",
      label: "Dirección",
      value: `${address?.street} ${address?.number}, ${address?.city}, ${address?.state}, ${address?.postalCode}`,
    },
  ];

  function handleEditOpen(fieldKey, currentValue) {
    setSelectedField(fieldKey);

    if (fieldKey === "address") {
      setEditableValue({
        address: {
          street: address.street || "",
          number: address.number || "",
          city: address.city || "",
          state: address.state || "",
          postalCode: address.postalCode || "",
        },
      });
    } else if (fieldKey === "name" && role === "seller") {
      setEditableValue(storeName || "");
    } else {
      setEditableValue(currentValue || "");
    }
    setOpenDialog(true);
  }

  function handleAddressChange(event) {
    const { name, value } = event.target;

    // Validación específica según el campo
    if (name === "number" && value.length > 10) {
      return;
    }

    if (name === "postalCode" && value.length > 5) {
      return;
    }

    if (name === "number" || name === "postalCode") {
      // Asegurarse de que solo se acepten números
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    console.log("Antes de actualizar:", editableValue);
    setEditableValue({
      ...editableValue,
      address: {
        ...editableValue.address,
        [name]: value,
      },
    });

    console.log("Después de actualizar:", editableValue);
  }

  async function handleSave() {
    console.log(editableValue);
    const valueSend = { [selectedField]: editableValue };

    // Si el campo editable es "name" y el rol es "seller", enviamos "storeName"
    if (selectedField === "name" && role === "seller") {
      const response = await configProfile(
        { storeName: editableValue },
        userId,
        role
      );
      console.log(response);
    } else if (selectedField === "address") {
      const response = await configProfile(editableValue, userId, role);
      console.log(response);
    } else {
      const response = await configProfile(valueSend, userId, role);
      console.log(response);
    }

    setOpenDialog(false);
  }
  return (
    <>
      <Stack
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          height: "fit-content",
          backgroundColor: "#fff",
          boxShadow: 2,
          borderRadius: 5,
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <InfoOutlinedIcon color="primary" />
          Informacion
        </Typography>
        <Stack
          direction="row"
          sx={{ bgcolor: "#ECEFF1", p: 1, borderRadius: 2 }}
        >
          <Avatar
            src={picture || undefined}
            alt={email}
            sx={{
              width: 100,
              height: 100,
              color: "primary.main", // Color del texto
              fontWeight: "bold", // Peso de la fuente
              fontSize: "1.5rem",
            }}
          />

          <Box sx={{ pl: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>Correo</Typography>
            <Typography sx={{ fontWeight: "300" }}>{email}</Typography>
          </Box>
        </Stack>
        {details.map((detail, index) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            key={index}
            sx={{ bgcolor: "#ECEFF1", p: 1, borderRadius: 2 }}
          >
            <Stack>
              <Typography sx={{ fontWeight: "bold" }}>
                {detail.label}
              </Typography>
              <Typography sx={{ fontWeight: "300" }}>{detail.value}</Typography>
            </Stack>
            <IconButton
              onClick={() => handleEditOpen(detail.key, detail.value)}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <ProfileEditDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedField={selectedField}
        editableValue={editableValue}
        handleAddressChange={handleAddressChange}
        handleSave={handleSave}
        setEditableValue={setEditableValue}
      />
    </>
  );
}
