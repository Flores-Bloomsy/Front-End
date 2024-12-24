import UserDataFormCard from "@/components/profileConfig/UserDataFormCard";
import { Container, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { configProfileSchema } from "@/utils/yupSchema";
import Title from "@/components/cart/Title";

function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(configProfileSchema),
  });

  async function onSubmit(data) {
    const dataUpdate = {
      phone: data.phone,
      address: {
        street: data.addressStreet,
        number: data.addressNumber,
        city: data.addressCity,
        state: data.addressState,
        postalCode: data.addressPostalCode,
      },
    };
  }
  return (
    <Container>
      <Title title={"Direccion"} />
      <Divider sx={{ margin: "5px 0 20px 0", bgcolor: "#741C28" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserDataFormCard
          textoTitulo={"Direccion de entrega"}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          textoButton={"enviar formulario"}
          linkTo="/checkout"
        />
      </form>
    </Container>
  );
}

export default Checkout;
