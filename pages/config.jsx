import CardAddImg from "@/components/profileConfig/CardAddImg";
import ProfileHeader from "@/components/profileConfig/ProfileHeader";
import UserDataFormCard from "@/components/profileConfig/UserDataFormCard";
import { Box, Container } from "@mui/material";
import { configProfileSchema } from "@/utils/yupSchema";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { decodeToken } from "@/utils/decodeToken";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { configProfile, getUserById } from "@/utils/apiSeller";

export default function Config() {
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      router.push("/register-user/login");
      return;
    }

    const decodedUser = decodeToken(token);
    if (
      !decodedUser ||
      (decodedUser.rol !== "buyer" && decodedUser.rol !== "seller")
    ) {
      router.push("/register-user/login");
      return;
    }

    getUserById(decodedUser.id, decodedUser.rol)
      .then((response) => setUser(response))
      .catch((error) => setError(error));
  }, []);

  const role = user?.rol;
  const userId = user?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(configProfileSchema),
    context: { role },
  });

  const formValues = watch();

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
    if (role === "seller") {
      dataUpdate.storeName = data.storeName;
      dataUpdate.schedule = {
        opening: data.scheduleOpening,
        closing: data.scheduleClosing,
      };
    }

    if (role === "buyer") {
      dataUpdate.name = `${data.firstName} ${data.lastName}`;
    }

    try {
      setIsSubmitting(true);
      const updateProfile = await configProfile(dataUpdate, userId, role);

      if (updateProfile) {
        router.push("/");
        setIsSubmitting(false);
      }
    } catch (error) {
      setError("root.data", { type: "manual", message: error.message });
      setIsSubmitting(false);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ display: "grid", gap: 5, my: 5 }}>
      <ProfileHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row " },
            gap: 2,
          }}
        >
          <CardAddImg
            role={role}
            register={register}
            errors={errors}
            email={user?.email}
          />
          <UserDataFormCard
            role={role}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </Box>
      </form>
    </Container>
  );
}
