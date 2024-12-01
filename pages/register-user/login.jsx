import { Typography } from "@mui/material";

function login() {
  return (
    <Typography
      variant="h1"
      sx={{
        fontFamily: "Lora, serif",
        fontWeight: 700,
        fontSize: "34px",
        textAlign: "center",
        paddingBottom: "10px",
      }}
    >
      {" "}
      Soy un login
    </Typography>
  );
}

export default login;
