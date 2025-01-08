import * as Yup from "yup";

export const validationSchema = Yup.object({
  images: Yup.string().trim().url("Debe ser una URL válida."),
  nameProduct: Yup.string().required("El nombre del producto es obligatorio"),
  productDescription: Yup.string().required("La descripción es obligatoria"),
  productPrice: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a cero")
    .typeError("El precio debe ser números"),
  productQuantity: Yup.number()
    .required("La cantidad es obligatorio")
    .positive("El precio debe ser mayor a cero")
    .typeError("la cantidad debe ser números"),
  ocacion: Yup.array()
    .min(1, "Debes seleccionar al menos una ocasión")
    .max(3, "Solo puedes seleccionar hasta 3 opciones")
    .required("Es obligatorio seleccionar una opción"),
  Tamano: Yup.string()
    .oneOf(["Pequeño", "Mediano", "Grande"])
    .required("Tamaño es requerido"),
  color: Yup.array()
    .min(1, "Debes seleccionar al menos un color")
    .max(3, "Solo puedes seleccionar hasta 3 opciones")
    .required("Es obligatorio seleccionar una opción"),
  estilo: Yup.string()
    .oneOf([
      "Moderno",
      "Minimalista",
      "Rustico",
      "Elegante",
      "Clasico",
      "Vintage",
    ])
    .required("Estilo es requerido"),
  floresYTipos: Yup.array()
    .min(1, "Debes seleccionar al menos un tipo de flor")
    .max(3, "Solo puedes seleccionar hasta 3 opciones")
    .required("Es obligatorio seleccionar una opción"),
  personalida: Yup.array()
    .min(1, "Debes seleccionar al menos una personalidad")
    .max(3, "Solo puedes seleccionar hasta 3 opciones")
    .required("Es obligatorio seleccionar una opción"),
});
