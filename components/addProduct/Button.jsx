import { Button } from "@mui/material";

function ButtonAddProduct({ onClick, sx, children, disabled }) {
  return (
    <Button
      sx={{
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        ...sx,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default ButtonAddProduct;
