"user client";
import { useForm } from "react-hook-form";
import { Button, Typography, Container, Box } from "@mui/material";
import InputField from "@/components/InputField";
import { useTheme } from "@mui/material/styles";
import ToggleLineButtons from "@/components/ToggleLineButtons";

export default function Register() {
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitted },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container sx={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Lora, serif",
            fontWeight: 700,
            fontSize: "34px",
            textAlign: "center",
            paddingBottom: "10px",
          }}
        >
          ¡Bienvenid@ a <br />
          FloriApp!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: 16,
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Encuentra tu espacio de flores en <br /> México
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: 16,
            textAlign: "center",
            fontWeight: 700,
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Registrate
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#CFD8DC",
            marginY: "0,5rem",
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <ToggleLineButtons></ToggleLineButtons>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: "2rem",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <InputField
            name="email"
            control={control}
            label="Email"
            type="email"
            errors={errors}
            isSubmitted={isSubmitted}
            rules={{
              required: {
                value: true,
                message: "El email es obligatorio",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "El email no es válido",
              },
            }}
          />
          <InputField
            name="password"
            control={control}
            label="Password"
            type="password"
            errors={errors}
            isSubmitted={isSubmitted}
            rules={{
              required: {
                value: true,
                message: "El password es obligatorio",
              },
              minLength: {
                value: 6,
                message: "El password debe tener al menos 6 caracteres",
              },
            }}
          />

          <InputField
            name="confirmPassword"
            control={control}
            label="Confirmar Password"
            type="password"
            errors={errors}
            isSubmitted={isSubmitted}
            rules={{
              required: {
                value: true,
                message: "Debes confirmar tu password",
              },
              validate: (value) =>
                value === watch("password") || "Los passwords no coinciden",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            INICIAR SESION
          </Button>
        </form>
      </Box>
    </Container>
  );
}
