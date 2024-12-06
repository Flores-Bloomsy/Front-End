import CardAddImg from "@/components/profileConfig/CardAddImg";
import ProfileHeader from "@/components/profileConfig/ProfileHeader";
import UserDataFormCard from "@/components/profileConfig/UserDataFormCard";
import { useGetUser } from "@/hooks";
import { Box, Container } from "@mui/material";

export default function Config() {
  const user = useGetUser();
  console.log(user);
  return (
    <Container maxWidth="lg" sx={{ display: "grid", gap: 5, my: 5 }}>
      <ProfileHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row " },
          gap: 2,
        }}
      >
        <CardAddImg role={user?.rol} />
        <UserDataFormCard role={user?.rol} />
      </Box>
    </Container>
  );
}
