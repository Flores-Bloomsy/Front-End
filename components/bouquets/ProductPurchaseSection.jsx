import { useState } from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";
import BtnShopingCart from "../BtnShoppingCart";
import BtnComprarCart from "./BtnComprarCart";

export default function ProductPurcheaseSection({ props }) {
  const [productQuantity, setProductQuantity] = useState(1);
  console.log(productQuantity);

  function handleIncrement() {
    setProductQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    if (productQuantity > 1) setProductQuantity((prev) => prev - 1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        minWidth: { xs: "auto", md: "17rem" },
      }}
    >
      <Typography color="primary">{props.price} MXN</Typography>
      <Typography>Personaliza tu compra</Typography>
      <Typography>disponibilidad: {props.stock}pz</Typography>
      <Box
        sx={{
          backgroundColor: "white",
          border: 2,
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-Between",
          alignItems: "center",
          p: 1,
        }}
      >
        <IconButton
          onClick={handleDecrease}
          sx={{ bgcolor: "secondary.main" }}
          color="primary"
        >
          <Remove />
        </IconButton>
        <TextField
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
          }}
          readOnly
          value={productQuantity}
        ></TextField>
        <IconButton
          onClick={handleIncrement}
          sx={{ bgcolor: "secondary.main" }}
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          gap: 1,
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
      >
        <Typography>Total</Typography>
        <Divider sx={{ borderColor: "primary.main", border: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{productQuantity} artículos</Typography>
          <Typography>{`$ ${props.price * productQuantity} MXN`}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <BtnShopingCart
          productId={props._id}
          quantity={productQuantity}
          image={props.images[0]}
          name={props.name}
        />
        <BtnComprarCart
          name={props.name}
          image={props.images[0]}
          productId={props._id}
          texto={"Comprar Ahora"}
          sx={{
            borderRadius: " 20px 0 20px 0",
            px: 4,
            py: 1,
          }}
        />
      </Box>
    </Box>
  );
}
