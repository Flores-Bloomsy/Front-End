import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  recipientName: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no debe exceder los 50 caracteres"),
  recipientLastName: yup
    .string()
    .max(50, "El apellido no debe exceder los 50 caracteres"),
  phoneNumber: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      "Debe ser un número de teléfono válido de 10 dígitos"
    )
    .nullable(),
  addressStreet: yup
    .string()
    .required("La calle es obligatoria")
    .min(3, "El nombre de la calle debe tener al menos 3 caracteres"),
  addressNumber: yup.string().matches(/^[0-9]+$/, "Debe ser un número válido"),
  addressCity: yup
    .string()
    .required("La ciudad es obligatoria")
    .min(2, "El nombre de la ciudad debe tener al menos 2 caracteres"),
  addressState: yup
    .string()
    .required("El estado es obligatorio")
    .min(2, "El estado debe tener al menos 2 caracteres"),
  country: yup
    .string()
    .required("El pais es obligatorio")
    .min(2, "El estado debe tener al menos 2 caracteres"),
  addressPostalCode: yup
    .string()
    .required("El código postal es obligatorio")
    .matches(/^[0-9]{5}$/, "Debe ser un código postal válido de 5 dígitos"),
});
