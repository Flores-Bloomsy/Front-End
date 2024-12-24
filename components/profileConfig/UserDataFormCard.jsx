import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function UserDataFormCard({
  role,
  register,
  errors,
  isSubmitting,
  textoButton,
  textoTitulo,
  linkTo,
}) {
  return (
    <Container
      sx={{
        bgcolor: "#fff",
        borderRadius: "18px",
        boxShadow: 2,
        p: 2,
        maxWidth: { sm: "35rem", md: "100%" },
        display: "grid",
        placeItems: "center",
        gap: 2,
      }}
    >
      <Typography sx={{ width: "100%", textAlign: "left" }}>
        {textoTitulo}
      </Typography>

      {role === "seller" ? (
        <TextField
          {...register("storeName")}
          label="Nombre de tu Floreria"
          variant="outlined"
          fullWidth
          error={!!errors.storeName}
          helperText={errors.storeName?.message}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
          }}
        >
          <TextField
            {...register("firstName")}
            label="Nombres"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            {...register("lastName")}
            label="Apellidos"
            variant="outlined"
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Box>
      )}
      <TextField
        label="Número de Celular"
        {...register("phone")}
        type="tel"
        variant="outlined"
        fullWidth
        error={!!errors.phone}
        helperText={errors.phone?.message}
        placeholder="Ej. 3345569778"
        sx={{
          "& input[type='tel']": {
            appearance: "textfield",
          },
        }}
      />
      {role === "seller" && (
        <>
          <Typography sx={{ textAlign: "left", width: "100%" }}>
            Horarios
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              width: "100%",
            }}
          >
            <TextField
              type="time"
              label="Apertura"
              {...register("scheduleOpening")}
              variant="outlined"
              fullWidth
              error={!!errors.scheduleOpening}
              helperText={errors.scheduleOpening?.message}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            <TextField
              type="time"
              label="Cierre"
              {...register("scheduleClosing")}
              variant="outlined"
              fullWidth
              error={!!errors.scheduleClosing}
              helperText={errors.scheduleClosing?.message}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Box>
        </>
      )}
      <Typography sx={{ textAlign: "left", width: "100%" }}>
        Direccion
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        <TextField
          {...register("addressStreet")}
          label="Calle"
          variant="outlined"
          fullWidth
          error={!!errors.addressStreet}
          helperText={errors.addressStreet?.message}
        />
        <TextField
          {...register("addressNumber")}
          label="Número de Casa"
          variant="outlined"
          fullWidth
          error={!!errors.addressNumber}
          helperText={errors.addressNumber?.message}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        <TextField
          {...register("addressCity")}
          label="Ciudad"
          variant="outlined"
          fullWidth
          error={!!errors.addressCity}
          helperText={errors.addressCity?.message}
        />
        <TextField
          {...register("addressState")}
          label="Estado"
          variant="outlined"
          fullWidth
          error={!!errors.addressState}
          helperText={errors.addressState?.message}
        />
      </Box>
      <TextField
        {...register("addressPostalCode")}
        label="Código Postal"
        type="number"
        variant="outlined"
        fullWidth
        error={!!errors.addressPostalCode}
        helperText={errors.addressPostalCode?.message}
      />
      <Box sx={{ width: "100%", textAlign: "right" }}>
        {linkTo ? (
          // Si 'linkTo' está definido, renderiza un enlace
          <Link href={linkTo}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                borderRadius: " 25px 0 25px 0",
                padding: ".8rem 1.5rem",
                width: { xs: "100%", lg: "auto" },
              }}
            >
              {textoButton}
            </Button>
          </Link>
        ) : (
          // Si 'linkTo' no está presente, renderiza un botón normal
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              borderRadius: " 25px 0 25px 0",
              padding: ".8rem 1.5rem",
              width: { xs: "100%", lg: "auto" },
            }}
          >
            {textoButton}
          </Button>
        )}
      </Box>
    </Container>
  );
}
