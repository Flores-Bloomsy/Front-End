import React from "react";
import { TextField, Box, Container, Typography, Button } from "@mui/material";
import { Controller } from "react-hook-form";

const Formulario = ({ control, handleSubmit, errors }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
        Crear un Producto
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%" }}
      >
        <Controller
          name="productName"
          control={control}
          rules={{ required: "El nombre del producto es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre de tu producto"
              variant="outlined"
              fullWidth
              error={!!errors.productName}
              helperText={errors.productName?.message}
              sx={{ marginBottom: "1rem" }}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default Formulario;
