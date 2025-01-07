import { Button } from "@mui/material";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";

export default function OrderStatus({ paymentStatus }) {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      style={{ marginTop: "1rem" }}
      sx={{
        display: "flex",
        color: "white",
        backgroundColor:
          paymentStatus === "PENDING"
            ? "red"
            : paymentStatus === "COMPLETED"
            ? "green"
            : "gray",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        py: "10px",
        px: "10px",
      }}
    >
      <WalletOutlinedIcon sx={{ mr: 1 }} />
      {paymentStatus === "PENDING"
        ? "No Pagada"
        : paymentStatus === "COMPLETED"
        ? "Pagada"
        : "Fallida"}{" "}
    </Button>
  );
}
