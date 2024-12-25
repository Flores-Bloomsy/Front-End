import { object, string } from "yup";

export const configProfileSchema = object({
  profilePic: string().trim().url("Debe ser una URL válida."),
  phone: string()
    .trim()
    .matches(
      /^\d{10}$/,
      "El número de teléfono debe tener exactamente 10 dígitos."
    )
    .required("El número de teléfono es obligatorio."),
  addressStreet: string().trim().required("La calle es obligatoria."),
  addressNumber: string().trim().required("El número es obligatorio."),
  addressCity: string().trim().required("La ciudad es obligatoria."),
  addressState: string().trim().required("El estado es obligatorio."),
  addressPostalCode: string()
    .trim()
    .matches(
      /^\d{5}$/,
      "El número de teléfono debe tener exactamente 5 dígitos."
    )
    .required("El código postal es obligatorio."),
  storeName: string()
    .trim()
    .when("$role", {
      is: "seller",
      then: (schema) =>
        schema.required("El nombre de la tienda es obligatorio."),
      otherwise: (schema) => schema.notRequired(),
    }),
  scheduleClosing: string()
    .trim()
    .when("$role", {
      is: "seller",
      then: (schema) => schema.required("La hora de apertura es obligatoria."),
      otherwise: (schema) => schema.notRequired(),
    }),
  scheduleOpening: string()
    .trim()
    .when("$role", {
      is: "seller",
      then: (schema) => schema.required("La hora de apertura es obligatoria."),
      otherwise: (schema) => schema.notRequired(),
    }),
  firstName: string()
    .trim()
    .when("$role", {
      is: "buyer",
      then: (schema) => schema.required("El nombre es obligatorio."),
      otherwise: (schema) => schema.notRequired(),
    }),
  lastName: string()
    .trim()
    .when("$role", {
      is: "buyer",
      then: (schema) => schema.required("El apellido es obligatorio."),
      otherwise: (schema) => schema.notRequired(),
    }),
});
