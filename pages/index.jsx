import { Container } from "@mui/material";
import SectionOne from "@/components/LandinPage/SectionOne";
import SectionTwo from "@/components/LandinPage/SectionTwo";
import SectionThree from "@/components/LandinPage/SectionThree";
import SectionFour from "@/components/LandinPage/SectionFour";
import SectionFive from "@/components/LandinPage/SectionFive";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{ paddingY: 4, display: "flex", flexDirection: "column", gap: 5 }}
    >
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </Container>
  );
}
