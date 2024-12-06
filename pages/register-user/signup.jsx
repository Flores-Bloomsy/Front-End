"user client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Container, Box } from "@mui/material";
import InputField from "@/components/InputField";
import { useTheme } from "@mui/material/styles";
import ToggleLineButtons from "@/components/ToggleLineButtons";
import { Signup } from "../../utils/api";
import { useSnackbar } from "notistack";
import ImageContainer from "@/components/ImageContainer";

export default function Register() {
  const theme = useTheme();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitted },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await Signup(data.email, data.password);

      if (response) {
        router.push("/register-user/login");
      }
    } catch (error) {
      let message;

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message.replace("Error: ", "");
      } else {
        message = "Hubo un error desconocido";
      }

      if (message === "User already exists") {
        enqueueSnackbar("Este correo ya está registrado. Intenta con otro.", {
          variant: "error",
          style: {
            backgroundColor: "#741C28",
          },
        });
      } else {
        enqueueSnackbar(message || "Hubo un error. Intenta nuevamente.", {
          variant: "error",
          style: {
            backgroundColor: "#741C28",
          },
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      sx={{
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          ¡Bienvenid@ a{" "}
          <span
            style={{
              display: "inline-block",
              whiteSpace: "normal",
            }}
          >
            Blooms&Bits
          </span>
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
          Encuentra tu espacio de flores en{" "}
          <span
            style={{
              display: "inline-block",
              whiteSpace: "normal",
            }}
          >
            México
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: { sm: "white", xs: "transparent" },
          width: { sm: "950px", xs: "100%" },
          borderBottomLeftRadius: { sm: "16px", xs: "0" },
          borderBottomRightRadius: { sm: "16px", xs: "0" },
          borderTopLeftRadius: { sm: "16px", xs: "0" },
          borderTopRightRadius: { sm: "16px", xs: "0" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: { xs: "16px", sm: "0" },
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
                width: { sm: "380px", xs: "100%" },
                height: "1px",
                backgroundColor: "#CFD8DC",
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
            <ToggleLineButtons
              user="/register-user/signup"
              seller="/register-userSeller/signupSeller"
            ></ToggleLineButtons>
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: { xs: "16px", sm: "0" },
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
              {errorMessage && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ textAlign: "center", marginBottom: "1rem" }}
                >
                  {errorMessage}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
                disabled={isSubmitting}
                sx={{
                  borderTopLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                  borderTopRightRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "45%",
                    height: "1px",
                    backgroundColor: "#741C28",
                    marginY: "0,5rem",
                  }}
                />
                <Box sx={{ color: "#741C28" }}>0</Box>
                <Box
                  sx={{
                    width: "45%",
                    height: "1px",
                    backgroundColor: "#741C28",
                    marginY: "0,5rem",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  Al crear tu cuenta de usuario en FloriApp, aceptas los{" "}
                  <span style={{ color: "#741C28" }}>
                    Términos y Condiciones
                  </span>{" "}
                  y
                  <span style={{ color: "#741C28" }}>
                    el Aviso <br />
                    de privacidad
                  </span>
                  del servicio
                </Typography>
                <Link href={"/register-user/login"}>
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: 14,
                      color: "#741C28",
                      textDecoration: "none",
                    }}
                  >
                    Inicia sesión
                  </Typography>
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <ImageContainer height={550} image="/flores-en-harron.jpg" />
        </Box>
      </Box>
    </Container>
  );
}
