"use client";

import UserDataFormCard from "@/components/profileConfig/UserDataFormCard";
import { Container, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { checkoutSchema } from "@/utils/destinationSchema";
import Title from "@/components/cart/Title";
import { useRouter } from "next/router";
import { useShipping } from "@/context/shippingContext";

function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Estado para almacenar los datos del formulario
  const { setShippingInfo } = useShipping();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const handleFormSubmit = (data) => {
    const formattedData = {
      name: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      street: data.addressStreet,
      number: data.addressNumber,
      city: data.addressCity,
      state: data.addressState,
      country: data.country,
      postalCode: data.addressPostalCode,
    };
    setShippingInfo(formattedData);

    // console.log(formattedData);
    router.push("/checkout");
  };

  return (
    <Container>
      <Title title={"Direccion"} />
      <Divider sx={{ margin: "5px 0 20px 0", bgcolor: "#741C28" }} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <UserDataFormCard
          textoTitulo={"Direccion de entrega"}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          textoButton={"enviar formulario"}
        />
      </form>
    </Container>
  );
}

export default Checkout;
