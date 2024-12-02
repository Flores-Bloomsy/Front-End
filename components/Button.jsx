import { Button } from "@mui/material";

export default function Btn({ text, href = "/" }) {
  return (
    <Button
      variant="contained"
      href={href}
      sx={{
        borderRadius: " 25px 0 25px 0",
        textTransform: "none",
        padding: "10px 22px",
      }}
    >
      {text}
    </Button>
  );
}
