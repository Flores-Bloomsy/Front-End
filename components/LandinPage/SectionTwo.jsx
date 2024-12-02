import { Box, Container, Typography } from "@mui/material";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function SectionTwo() {
  const PlatformBenefits = [
    {
      icon: <MailOutlineRoundedIcon fontSize="large" />,
      text: "Incluye un mensaje digital personalizado",
    },
    {
      icon: <QuestionMarkRoundedIcon fontSize="large" />,
      text: "Contesta el cuestionario y encuentra el arreglo perfecto",
    },
    {
      icon: <CalendarMonthOutlinedIcon fontSize="large" />,
      text: "Seleccióna el Horario de Entrega",
    },
  ];

  return (
    <Container
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        borderRadius: "5px 25px 5px 25px ",
        boxShadow: 1,
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
        }}
      >
        {PlatformBenefits.map((benefit, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              width: "100%",
            }}
          >
            <Box
              sx={{
                backgroundImage: "url('/stain-bg.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
              }}
            >
              {benefit.icon}
            </Box>
            <Typography sx={{ fontWeight: "600" }}>{benefit.text}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
