import { KeyboardBackspace, StayPrimaryLandscape } from "@mui/icons-material";
import { FormHelperText, Radio, Typography } from "@mui/material";
import ButtonAddProduct from "@/components/addProduct/Button";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { opciones } from "@/utils/arrayCheckbox";
import { validationSchema } from "@/utils/yupSchemaDelProducto";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProduct } from "@/utils/apiProduct";
import { useSnackbar } from "notistack";
import { decodeToken } from "@/utils/decodeToken";
import { useRouter } from "next/router";
import { useFileUpload } from "@/hooks/useUploadImg";

import {
  Box,
  Container,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import PaypalMerchanId from "@/components/paypal/PaypalMerchanId";
import Link from "next/link";

function AddProduct() {
  const { isUploadingFile, imageUrl, onFileInputChange, resetImageUrl } =
    useFileUpload();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [token, setToken] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      router.push("/register-userSeller/loginSeller");
      return;
    }
    setToken(token);

    const decodedUser = decodeToken(token);

    if (!decodedUser || decodedUser.rol !== "seller") {
      router.push("/");
      return;
    }

    console.log("Acceso permitido. Usuario autorizado:", decodedUser);
  }, [router]);

  const onSubmit = async (data) => {
    const dataSend = { ...data, images: [imageUrl] };
    if (!token) {
      console.error("Token no disponible");
      return;
    }
    console.log(dataSend);

    setIsSubmitting(true);

    try {
      const response = await createProduct(dataSend, token);
      console.log(response);

      if (response.success) {
        enqueueSnackbar("¡Producto creado con éxito!", {
          variant: "success",
          style: {
            backgroundColor: "#741C28",
          },
        });

        reset();
        resetImageUrl();
        // setImage(null);
        // setImageName("");
      } else {
        enqueueSnackbar("Hubo un error al crear el producto", {
          variant: "error",
          style: {
            backgroundColor: "#D32F2F",
          },
        });
      }

      reset();
      resetImageUrl();
      // setImage(null);
      // setImageName("");
    } catch (error) {
      console.error("Error al enviar el producto", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (groupName, option) => {
    const currentValue = watch(groupName) || [];

    if (currentValue.includes(option)) {
      const updatedValue = currentValue.filter((item) => item !== option);
      setValue(groupName, updatedValue);
    } else {
      if (currentValue.length >= 3) {
        enqueueSnackbar("Solo se puede selecionar asta 3 opciones", {
          variant: "error",
          style: {
            backgroundColor: "#D32F2F",
          },
        });
        return;
      }

      const updatedValue = [...currentValue, option];
      setValue(groupName, updatedValue);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Container>
      <PaypalMerchanId />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          widows: "100%",
          mt: "15px",
        }}
      >
        <Box>
          <Box
            component={Link}
            href={"/dashboard"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              color: "#5A607F",

              "&:hover": {
                color: "#9C2E3A",
                fontWeight: "bold",
              },
              cursor: "pointer",
            }}
          >
            <KeyboardBackspace
              sx={{
                fontSize: "18px",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",

                fontFamily: "Nunito, sans-serif",
              }}
            >
              Volver
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Lora, serif",
                fontSize: { xs: "1rem", md: "1.50rem" },
                variant: { xs: "body1", md: "h6" },
              }}
            >
              Anadir Producto
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
          }}
        >
          <ButtonAddProduct
            sx={{ backgroundColor: "white" }}
            onClick={handleCancel}
          >
            {"cancelar"}
          </ButtonAddProduct>

          <ButtonAddProduct
            sx={{ backgroundColor: "#9C2E3A", color: "white" }}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Guardar"}
          </ButtonAddProduct>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexGrow: 1, mt: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Box sx={{ bgcolor: "white", p: 2, borderRadius: "10px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "semibold",
                    fontFamily: "nunito, serif",
                  }}
                >
                  Nombre del producto
                </Typography>
                <TextField
                  sx={{ width: "100%", mb: 2 }}
                  label="Nombre del producto"
                  variant="outlined"
                  fullWidth
                  {...register("nameProduct")}
                  error={!!errors.nameProduct}
                  helperText={errors.nameProduct?.message}
                  margin="normal"
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "semibold",
                    fontFamily: "nunito, serif",
                  }}
                >
                  Descripcion del producto
                </Typography>
                <TextField
                  sx={{ width: "100%", mb: 2 }}
                  label="Descripcion del producto"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("productDescription")}
                  error={!!errors.productDescription}
                  helperText={errors.productDescription?.message}
                  margin="normal"
                />
                <Divider sx={{ margin: "20px 0" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontFamily: "Lora, serif" }}
                >
                  Imagenes
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "10.5rem",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer",
                    border: "2px dashed #000",
                    backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&:hover": { backgroundColor: "rgba(114, 114, 114, 0.2)" },
                  }}
                >
                  <input
                    disabled={isUploadingFile}
                    accept="image/*"
                    type="file"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                    aria-label="Subir foto de perfil"
                    onChange={onFileInputChange}
                  />
                  {isUploadingFile ? (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 14,
                        color: "primary.main",
                      }}
                    >
                      Cargando...
                    </Typography>
                  ) : !imageUrl ? (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 14,
                          color: "primary.main",
                          bgcolor: "#fff",
                          border: 1,
                          p: 1,
                          borderRadius: 1,
                        }}
                      >
                        Agregar Imagen
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 14,
                        color: "primary.main",
                        bgcolor: "#fff",
                        border: 1,
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      Cambiar Imagen
                    </Typography>
                  )}
                  {/* <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 14,
                      color: "primary.main",
                      border: 1,
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    Agregar Imagen
                  </Typography> */}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "semibold",
                    fontFamily: "nunito, serif",
                  }}
                >
                  Precio
                </Typography>
                <TextField
                  sx={{ width: "50%", mb: 2 }}
                  label="Precio del producto"
                  variant="outlined"
                  fullWidth
                  {...register("productPrice")}
                  error={!!errors.productPrice}
                  helperText={errors.productPrice?.message}
                  margin="normal"
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "semibold",
                    fontFamily: "nunito, serif",
                  }}
                >
                  Cantidad del producto
                </Typography>
                <TextField
                  sx={{ width: "50%", mb: 2 }}
                  label="cuantos tienes"
                  variant="outlined"
                  fullWidth
                  {...register("productQuantity")}
                  error={!!errors.productQuantity}
                  helperText={errors.productQuantity?.message}
                  margin="normal"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              {Object.entries(opciones).map(([groupName, options]) => (
                <Box
                  key={groupName}
                  sx={{ bgcolor: "white", p: 2, borderRadius: "10px", mb: 3 }}
                >
                  <Typography sx={{ mb: "10px", fontFamily: "Lora, serif" }}>
                    {groupName.charAt(0).toUpperCase() +
                      groupName.slice(1).replace(/([A-Z])/g, " $1")}
                  </Typography>

                  {options.map((option) => (
                    <Controller
                      key={option}
                      name={groupName}
                      control={control}
                      render={({ field }) => {
                        if (groupName === "estilo" || groupName === "Tamano") {
                          return (
                            <FormControlLabel
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pl: "20px",
                              }}
                              control={
                                <Radio
                                  {...field}
                                  checked={field.value === option}
                                  color="primary"
                                  onChange={() => setValue(groupName, option)}
                                />
                              }
                              label={option}
                            />
                          );
                        } else {
                          return (
                            <FormControlLabel
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pl: "20px",
                              }}
                              control={
                                <Checkbox
                                  {...field}
                                  checked={
                                    watch(groupName)?.includes(option) || false
                                  }
                                  color="primary"
                                  onChange={() =>
                                    handleCheckboxChange(groupName, option)
                                  }
                                />
                              }
                              label={option}
                            />
                          );
                        }
                      }}
                    />
                  ))}

                  {errors[groupName] && (
                    <FormHelperText error>
                      {errors[groupName]?.message}
                    </FormHelperText>
                  )}
                </Box>
              ))}
            </Grid>
          </Grid>

          <Divider sx={{ margin: "20px 0" }} />
          <Box sx={{ textAlign: { md: "end", xs: "center" }, mb: "20px" }}>
            <ButtonAddProduct
              sx={{ backgroundColor: "white" }}
              onClick={handleCancel}
            >
              {"cancelar"}
            </ButtonAddProduct>

            <ButtonAddProduct
              sx={{ backgroundColor: "#9C2E3A", color: "white" }}
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Guardar"}
            </ButtonAddProduct>
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default AddProduct;
