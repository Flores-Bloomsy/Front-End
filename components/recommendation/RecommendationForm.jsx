import { useState } from "react";
import { useForm } from "react-hook-form";

import { getBouquetByFilter } from "@/utils/apiProduct";

import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";

const formQuestions = [
  {
    id: 1,
    name: "occasion",
    question: "¿Para que ocasión estas buscando el ramo?",
    helperText: "Elije tu ocasión especial",
    inputType: "select",
    options: [
      "Cumpleaños",
      "Condolencias",
      "Día de las madres",
      "Aniversarios",
      "Nuevo Bebé",
      "Reconciliación",
      "Agradecimiento",
      "Graduación",
      "Día de Muertos",
      "San Valentín",
      "Corporativo",
      "Boda",
    ],
  },
  {
    id: 2,
    name: "color",
    question: "¿Tienes algún color preferido para las flores?",
    helperText: "Elija su color",
    inputType: "select",
    options: [
      "Rojo",
      "Blanco",
      "Amarillo",
      "Rosa",
      "Azul",
      "Verde",
      "Naranja",
      "Morado",
      "Lavanda",
      "Coral",
      "Durazno",
      "Violeta",
      "Fucsia",
      "Burgundy",
      "Crema",
      "Champán",
    ],
  },
  {
    id: 3,
    name: "flowerType",
    question:
      "¿Hay algún tipo de flor que te gustaría que se agregara al ramo?",
    helperText: "Elija su tipo de flor",
    inputType: "select",
    options: [
      "Rosas",
      "Tulipanes",
      "Orquídeas",
      "Lirios",
      "Margaritas",
      "Girasoles",
      "Claveles",
      "Hortensias",
      "Peonías",
      "Gladiolos",
      "Fresias",
      "Gerberas",
      "Crisantemos",
      "Anémonas",
      "Dalias",
      "Lavanda",
      "Jazmines",
      "Gardenias",
      "Alstroemerias",
      "Flor de Loto",
    ],
  },
  {
    id: 4,
    name: "style",
    question: "¿Que estilo prefieres para el ramo?",
    helperText: "Elija su estilo",
    inputType: "select",
    options: [
      "Moderno",
      "Minimalista",
      "Rustico",
      "Elegante",
      "Clasico",
      "Vintage",
    ],
  },
  {
    id: 5,
    name: "size",
    question: "¿Que tamaño estas buscando?",
    helperText: "Elija su tamaño",
    inputType: "select",
    options: ["Pequeño", "Mediano", "Grande"],
  },
];

export default function RecommendationForm({ onBouquetsFiltered }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
      setIsSubmitting(true);

      const response = await getBouquetByFilter(data);
      console.log("res", response);

      if (response.length) {
        onBouquetsFiltered(response);
      }

      if (!response.length) {
        onBouquetsFiltered(null);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error.message);

      setIsSubmitting(false);
    }
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h2" fontSize={24}>
        Encuentra el Ramo Perfecto
      </Typography>
      <Stack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        spacing={2}
        sx={{
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: 1,
          p: 3,
        }}
      >
        <Typography variant="h6">
          Aqui te ayudamos a buscar el ramo perfecto
        </Typography>
        {formQuestions.map((field) => (
          <Stack key={field.id} spacing={1}>
            <Typography>{field.question}</Typography>
            <Typography
              variant="caption"
              color={errors?.[field.name] ? "red" : "text.primary"}
            >
              {field.helperText}
            </Typography>
            {field.inputType === "select" && (
              <Select
                sx={{ height: "3rem" }}
                {...register(field.name, {
                  required: "Este campo es obligatorio",
                })}
              >
                {field.options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Stack>
        ))}
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          sx={{
            width: "min-content",
            whiteSpace: "nowrap",
            borderRadius: " 20px 0 20px 0",
            alignSelf: "center",
          }}
        >
          Buscar Ramo
        </Button>
      </Stack>
    </Stack>
  );
}
